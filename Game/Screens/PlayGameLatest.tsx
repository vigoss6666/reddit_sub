import  React, {useState,useRef,useEffect, useContext, useLayoutEffect, useCallback} from 'react';
import { Text, View, StyleSheet,Dimensions, Animated, Image } from 'react-native';
import AppContext from '../../AppContext'; 
import {updateUser} from '../../networking';
import { firebase } from '../../config'; 
import Draggable from 'react-native-draggable';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const db = firebase.firestore(); 
//@refresh reset
interface PlayGameLatestProps {}
const computeName = (obj) => {
    if(obj.name){
       return obj.name
    }
    if(obj.firstName && obj.lastName){
       return obj.firstName+obj.lastName
    }
    return obj.firstName
}

const PlayGameLatest = (props: PlayGameLatestProps) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadeOpac = useRef(new Animated.Value(0)).current;
  const [questionsIndex, setQuestionsIndex] = useState(0); 
  const insets = useSafeAreaInsets();
  const {width, height} = Dimensions.get('window');   
  const [mainWidth, setMainWidth] = useState()
  const [mainHeight, setMainHeight] = useState()
  const [mainX, setMainX] = useState()
  const [mainY, setMainY] = useState()
  const mailer = useRef(); 
  const [containerHeight, setContainerHeight] = useState(200); 
  const [index, setIndex] = useState(0); 
  const [profiles,setProfiles] = useState([])
  const myContext = useContext(AppContext); 
  const [questions, setQuestions] = useState([{dimension:'creativity', question:'something'}]); 
 console.log(questions.length)
  

  const getData = useCallback(() => {
    console.log("i was called")  
    db.collection('questions').get().then(onResult => {
         const result = onResult.docs.map(val => val.data()); 
         setQuestions(result); 
    })
  }, [questions])


  useEffect(() => {
   getData() 
  }, [])

  
  

  const fadeOp = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    
    Animated.sequence([
      Animated.timing(fadeOpac, {
        toValue: 0,
        useNativeDriver:false,
        duration: 1
      }),
      Animated.timing(fadeOpac, {
        useNativeDriver:false,
        toValue: 1,
        duration: 300
      }),
      Animated.timing(fadeOpac, {
        useNativeDriver:false,
        toValue: 0,
        duration: 300
      })
    ]).start()
  };
  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        useNativeDriver:false,
        duration: 1
      }),
      Animated.timing(fadeAnim, {
        useNativeDriver:false,
        toValue: 1,
        duration: 100
      }),
      Animated.timing(fadeAnim, {
        useNativeDriver:false,
        toValue: 0,
        duration: 100
      })
    ]).start()
  };

  
   
  
  const [namer, setNamer] = useState(); 
  const mainView = useRef(); 
    const {user, userId} = myContext;
  const demo = [
      {
      name:"zaid", 
      "profilePic": "",
     }, 
     {
        name:"nihal", 
        "profilePic": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYWFRgWFRUYGBgYHBgcGBwaGhgYGBgYGBgZGhgaGBgcIS4lHB4rIRgYJjgmKy8xNTU1GiQ7QDs0Py40NTEBDAwMEA8QHhISHjQkJCE0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NTQ0NDQ0NDE0NDQ0NDQ0MTQ0NDExNP/AABEIARMAtwMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAACAAEDBAYFB//EAEAQAAIBAgMECAMFBwMEAwAAAAECAAMRBCExEkFRYQUGInGBkaGxEzLBQlJi0fAHI3KCouHxkrLCFDTS4hYzQ//EABoBAQADAQEBAAAAAAAAAAAAAAABAgQDBQb/xAAjEQEBAAICAgICAwEAAAAAAAAAAQIRAyExMhJRBEETImFx/9oADAMBAAIRAxEAPwCw1cZ8hfzhJUB0gBF4a+sJNkaCRqAqrWF4JrD0PdlCLDgYKgbwfKSBWspA58ZV6V6PFZAt9nO9wAZdy4Hyh7MhLMUuqgUk/GYkgqbqpyOuRhJ1SQf/AKP6CaUkQGccY7OkeGobCKgJOyALnXKTRCQV6lgQNYEVWsSwVdxzO4W3GWpWqnYGS9p9bcZJRFlub3Ot93hCUhMrPXJNlGR+1uEc1iTfRBe5490CpSJBAsqZEEb+MAqde5sO0Bq268ld9QNeEgte6JkAbXGmm+WKdK3M7zvgDRckXZdk8IRMK0YiAwiiMA1Ru1hAiYpE1957hAZjxz4b5GjaT4gvbfFGQHhYc9YpAvWj2kSv4+8MVRLaBWkdXdnaF8YREqRcxoRk3zvlvi721kuyLcowReEnaNIbLbM3jKQTkPSWNgcIrRtOiAykbUxcNvEkgu9hxlbZO6mTauaoQXZgbnwEr1sVdhY3G8A5G/GRPTBN3v3aH9ayqXVCMsie/uz8PWZ8uW3qO2PHP2v4lzba3DQbvHjpGXEB1DXK7Oo3EaHKGKqbNvPzlXpQFNll0A+u88DIx5LvtOWE106VDTS31khylLo/HCoMsiNRl5y21pol34cLLPJekFViJ8Y6mWQEptDh7wAh4W+slB8IJteAwpgZ2iRQN0cwe+ARbhFAa+6KVFpEI4RmYjUXjrUvHcHcZcCrfhsdI7E6W9IOy2t5eI3EayuWXxFMKOEJKI1AOUshByhk5HuMp/IaUxVB3xbY4wQi8IxogTr0g7twOkqbZN7EHv4x6lxZdAdTv8JUw1M3PM28Jk5bvLTTxY9K+MY7QucyNPMW56es5WIrkLslcx48u/hNQMCGP9obdAK2ZPv9DKYutjI4HGlgVO+4Hfbf6TrdH40sWR7Aa33gfoTqt0Ag0kb9FINdfyjKxExcSvtU8R8RSCjaC2YFjtaafK36M0dNwwBXMHQ7pw61FkIsbqM7HiDe3dYyToXEq11BPZOl8rHMWnTDKxzzw6dkiMeQjI+4CHY35TS4aCAd8aw0kuzGAhCPZ4xgvCSlYgIETKe6KG8UGhChx8DvirEheOnvLNorRs0rs+/llCbFsSAE3cTJXNs98cCRZL5Qj+K/BfWIu53qO4SUyK7W3RMYbJFsImF9cuEHtG/aFjpaPRAz7V/pLI25vSD2qKMxcZd4P+JPh0lXpHOunJP+R/KSo7k7KWHFjx4ATHyT+1beL1js4dZavOHTxWIpHtqtROKZMP5Z3aVZWAYbxeJFrTNOfiZLjOmKSZG5PBRcyg/SKN9l0vptCw85FiZUdXDBwScrb5x8NhNjEKFAsTtDxBv9Z2arnZNpS6ILO7s32QFHjn+u+ThN5RTkupXT2Odu6GBCJgsLzWylB2xnbdI6hAGd4yg2yFveE/HoW2d+XLfEWO4Zc44NtdeWcNQTqIELU+JJihAePGKDdXCIoG3p32hwqGppCgVDl5e8kgC6XFpFUo2FwCT3yxGvnytEV0qrSzts2H1k+x7fq8Nc8/KO7WkkmnGCdoEkFreNr5EjzhY7DVCAKbBdL63I32krLmWtlcAHkNROnQTaEw61Xo+e2XwuHrhj8SoSovbMcd9gN1+M7fR2JIpEnO21bmAcpJj8OAOZ0HvEcJancbt3vJuW6THUcnFYuoi7aqraZAfe4W4ZXhYfpX43YqJski9joQf138p08NQDKGHdz8ZaGHUDMSdzSNXbjYkFVI5Q+i8OUQlgbuxIHKwA9ode7NkNqx042lxqdjcm548rDyjj38lOSS43Zk0zEVogYrzWylsZxlTKx/KPeIOINnCwWp3kixi4yHHSADLbQeUUH/qFLbOd/TLdeKDYnQ65aiJ3IO6O2mpMTqpteEHIvqRDAPGQJSXPLT9GTooGkAgDFsm/hHEffJlQQEREIRWgVcSgt3W95bwRsvdIaqjPuziwlYW7xbxmblkmW/tq4crcdfSPGjbORI3XBtrrBfBHYCh3GzmDtNfLi17mc3GYV1qbadpTqrMwUHhcZiW67KVsiOrc3uFy3DMnOUkd++nQwOQ1ub9r/EPGvYSt0TRdR+9a99BaxFhvMWPqZd+kiot7RYT5WY5XI7znmIRYHUfrdEmQtEWnfDH4suefy6hXMQUQWB5R7nlOrnodoxB4CIk7owLcBBo5Q8dx9YyYZRY7xbOPVYi1r+V4g54G/hANl4R5HtNwig0dzkYFSmGAubQtsEXBBBGRByPcZG9yBYjL14SJSw5ofiPOGlO2e0cpXPxCciot5ESRFc7xv75ZC2jXj75WFN9LjW8mphvtW1Nu6NISiCxN9MoYjwIKp7Ldx9pRS62O6XcWezbjYesL4PYmbl9mnh6x2kpnaGUJKJBkeGRhmvlLL7dvltKR12r4yqFyEptTJ7TeE6GGwe0dps/rI+kcrCJO1belS8YmDeNeaWZJeODAEMSyNHBhCCBDEB7XkVSoygctcr37pMIUIQHEDXPyikxEUdDzPCY6onyuQOGq+Rymi6O6yqbLVUL+MfL/ADDd3zKBYTJOW9PoeX8fDk8zv7emU2BAKkEHQjMHukizB9AdJPTdUvdHYAg6C5ttDgZuGLXyzl5dvF5+G8WWqnkXxRcWvrnyjVqqIu07hQN5Nv8AJme6R60gdmigP4mGXeF/OWjPbI0tTEItyzBQNSSB7zPdL9alUbNHtN94jsjmBvPpMti8Y9Rtp3LHnoO4aCRBCchqbWtmb7rCWU+TfdHHbSkwdnLLtMSbnat2u7PcJo0S62nnvQmOfCVPhYlGVTY56ptZg81PL3vPQ8LVVlBUhlOYIzBHIzJljZldteGcuM0WFS0nq3MVNbSTWTJ0m0CJsrOP0mpY2E7NQzmVCA20xAC3JJyAHMyt68Jn+uM5sNSPeMd3aM4PS/WK+I26Q7CjZN9HzzNt3I6+07eCxqVVuh7wdV7xO83rdcflN6iyrgyRZGoEkSSijEMQFhhoBCEJGzgC5kDV3bJBYcTLSb8K7TVq6r8xilJaO0bH5V133YxTp/Gr8mECRiN0IZGQNUspbn/iZZH0+V1AO/by13d809frU9gEVQbC7HPO2dhoM5k6Oef64ywonXHF4P5fP88tT9J8Vi3dtp2LHn9OEhEO0dEl2DZlS9ha/wBZ6P1T6uCkvxaqj4h+UH7AP/L204weqXVkUwK1Ze3qin7HMj73t3zWkSXTHH9uX030HTxKbLizD5HFtpfzHKYZ8FjMAxKdunfUAsh5kaof1cz1ACHsyLNp/wBjzzDdeFPz0mU7ypDL62IlxeumH/H3bP8AeaTGdX8NUJL0UJOpA2W81sZS/wDh2Ev/APV/XU/8pT4Rb55M7ievCW7FF25sQg9LzlsuMx+SpZNbC6plpdz8x8/Ceg4bq/hkN0oJcaEjaI7i1yJ0Ph5RMMYW5XzXhoo2JByIyIO48JJh3dG2kJB4ibHrx1fVb4lFNif3gGQBP2/E68zMTsgaMRLWOfitX0d08jWSoQrcfsn8jO2J5g5nY6H6felZXu6cPtL/AAk7uUj4r45fbdU6ZY2Aj1HVeyoDNvJ+VeVt5lHC49alvhvdTrbI9xG6XEpgWtLY4b7qcsjU8OWOZud54d0mRAx2VFlG/fLDDKw/zI/lWw1b3b8vpO0ilphZRkMs/e14ofwrnZ3AZ/T6mKTtV5a2Qz3ZyhiH7IEmrVbBs/0ZUOZtwEx44vovyOXWNWqAy8ZMg7PnIcOdR3GWaAy8TOz53K9lT+s9G6m9W9hRXqr22zRSPkXcxH3j6d+nD6j9Biq3xX+RG7IP23Gf+kZHvtznpqiE44/sOzEy5QlGZjsIXOAI5jLCEBARWjuIxMBoxhawSJArYvDh0ZGF1ZSpHIixni/SeBelUdH+ZDbkRuPcRYz29hMH+0Do7NMQB+B/dD7j/TJVyjz404Fs5YqcfKAFsIc1nonGtRqBxe2jDiu/x4T0GnVDAspuCEsd1m2j9J5omk1nVHG3V6ZOYsV/hudO4n1lsb+k7a7DuHUMO48iDYj0kCvtPyUX8TkPSVMHiQBWzsA4ty2kBP1lrDLsqGOrkHwOnpOqV1Ftf3ij1chFKjxKu2fj7CLD6nmIqy5A8/cR8NrfiZmxet+Vf61PTyt5GdDo2gzvsILu7WUczx5Sls6jjNp+zTCBnq1Tqmyq8i4O0fS3iZ1eTrbddE4JaNJKS/YFidNo6s3ibmdEDKRUxrLCw6GCxOI94zyA4taJRFfKOsBMYjE8UBiIxhRQI2lHpbBCpTdG0dSM9x3HwNjOgRI647MDwzEUiHKsLFSQw4EGxHmJXrHO3hNX126P2K+2Plqja/nFg/0PiZk1F8+PtDjrQl0vLvROL+FVVz8uYbuI/wASqeEjfuky6o3XRdMuiA61Wao/8F8h5bI8Z28W/bReYMqdDDaXbAyIAUcEGkfE1P36j9aTtSOoyXPKKEDYRSqzxLGZADmJJQTIRVaW26Le1yJP8PZJUm5UkX5jWZ8Xo/mZeZ/sFs5TZ/syqZ11/gP++Y9Zo/2fVtnEOv3kB/0t/wC0vXnY+XqdMScSKnJjJdAiMY4EeQEBCtEscwGaMRCIyigCIywhvgmAiJDX0k15DUF4GM/aFhicMjj7D+ji3uBPOV9svzno/wC0fEbOGRL/ADuPJVY+9p5ydLQ55eSU74DmSGRtCr0nq696CH8K+dheRFtvE2+4PqPzkXVJ74ZeRYf1H+0fog7Veq3Agev9p3ngaFtIoL3jSqzx1D+9T+KWGw7KTtixJJvuN+ErX7ZP3e1/UBbyJ8pqsHTD7BOdyJjuXx7ejz8fzzs3pnu6dDqvV2MZT/ESp8VP1Am6ToDDuO1TW/EXU+YnOxPVqhTdXTbUoysO1cXBvncHKW/lljLOCyt/Q0BkxlfAm6CWbTsoa0YmEYxEgOBHIjLCOkBLBYRxCIvABWzjMIiPSJxvEAYDrJIDiB53+0x7tQT+Nv8AaPzmJmr/AGjVL4lF+6gP+pj/AOMyhEOeXkpHeGTI5KrZdTq/7lxf5Xv4FR+Rlvqs1zUbiw/XrOB1ZxGytcfgB8iR9RO/1QHYfm/0E6Y+o0d40ZjaKEvGQt3F97Aes3WCpgMigb/YTDlcr7xn6zcdXD8R1bcFHmZhz8PY5cdZb+2ywwsJz+lTOqi2WcvpCc/05Ty7vQdTapqZ1JnerFa6leBP5/WaIGbMbvGMec1lSIgmHaIiSqaEI0cQBjqYmjGAmXOCm8cJIMxIzkQYAcoLm0kqjfIKxygeU9dnLYx/wog9CfrOEyzU9LdB1a+JrOhS20FsxIPZVRw5SFOpmJOrUx/Mx9llflj9q5YZW+GZtykRWbJepD/aqoO5SfciVsf1YWmoO2zHaUaACxYA+hMiZ470fxZa3pncFXKF/wASFT6H6TddUE/d34kmZ/pzounSVPhqdptSSSbWz5TW9XqGxRUcpoks6qn6XibkxQbRQl5FiU2Qe4z0HqNhNmghOrC/5TC9JDJV3swHmZ6n0NRCooG4AekwZXqPa/J99fUdFmnKx7WE6jicvpRezKs08oOqjsHqP9gsqjvsbn1WblZkehcPs0F3FiX8zl6Wmpwr3UHlNWE1NMvJd5bWILCHaCZaqGEIQbQrQHIgGFFaACmxiqplE4jo1xABc1lXEk2B4XHicpZU2Ntxg1kuCDvkEZLDMBWqqNQVY/zKM/QzsIcpwcSNjGEX+ZFB7wTb0nYpPM2XtWrHvGJ30nA6XGl+I9xNA+kz3TLWBPDPylcPaf8AVr61m+m6m3WVR+EeJM2mCWyAcp5/gnNTErzf2nolMdmelfLz54DbKNDXSKQPI6NNq1YBBdaZBZt2Rz87WE9a6P8AlExfRFJFwyhNTsh+JcsNq/60m1wI7InnZXd19PUytytuXm1acTk9MmyEzrPpOV0lmUX7zoPNhJkctusKOwirwRR5AS/gHsSviPr+ucj6TFl8IAbZZW/Vt81eGXzHXtGIjxSUBjkRoV4DXjxo8ATIzkbiSiMRAjcXEZG2hzERFpCGsbwMh1mUpikfcwX07Le8vUqnaknXLDbSU2Gu2o8G19hIcNTmXOayrTx3eLpAgiZnrU+zRduA98vrNGJmut+dCoPwk+Wcrj7Re+tZnqkm1WU8AT5z0NdJiepFPVptlGU9GMFKmco8BY0Iea9Wq5+I6fZIRvFXA+vpPT8KMhPNOr6gVH42S3G23n9J6ZhjkJ5+Xs9blmsr/wBSvOW/axFFfxg+Wf0nTqtONg32sfTX7oc/0n85bGdxnvUrV9KJ2ICrtL4SfHrdJHQNrcDNOmWXpZwL3W28ZSzOeh2H5NOhaSIyIUFhDEgNaIiKKA0a8IiATAZpDVElbLOUsU5IJ3DTnII5PTmIH7tNSXLdwVW+pWDRE4NLEmtiWc6IpRR3sLnzX0mjpLM3L7NPFP6pLZTLdbW/cv8AwkeZAmoqaTI9cn/cMPvMg/qH5GVw9o6ZetN1Ro7NMHjnNPunG6BTZpAchOywynovPvk1HMNfjFFhTke8xQPMeh/+5Xmp/wBwM9RwfyiKKefl5evze1SYjScXoH/vzyRoopbH2jLl61tsX8hldPkHhFFNTL+ixHyy/T0HcI8UKk0QiikVY8RjRQFBaKKBBW0EhfSNFAxHRaD/AKnEZfb/AOR/OaNYopl5fZq4/U9TSY3rj8tPnUX2aKKRx+0Tn612ei/knRp6RRT0K88H2B3mKKKEv//Z",
     },
     {
        name:"huraira", 
        "profilePic": "https://i.pinimg.com/originals/bc/cc/3a/bccc3a73573a69385ae9e9dce82a952f.jpg",
     },
     {
        name:"jeevan", 
        "profilePic": "data:image/jpeg;base64,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",
    },
    {
        name:"namer", 
        "profilePic": "https://i.pinimg.com/originals/bc/cc/3a/bccc3a73573a69385ae9e9dce82a952f.jpg",
    },
    {
        name:"bach", 
        "profilePic": "https://i.pinimg.com/originals/bc/cc/3a/bccc3a73573a69385ae9e9dce82a952f.jpg",
    },     

]  
 const measure = () => {
      
 }
  useEffect(() => {
    db.collection('user').where(firebase.firestore.FieldPath.documentId(), 'in', user.datingPoolList).get().then(onResult => {
         const result = onResult.docs.map(val => val.data())
         setProfiles(result); 
    })      
  }, [])
  console.log("compinent was rendered")
  useLayoutEffect(() => {
    if(mailer.current){
        mailer.current.measure((x,y, height, width, px, py) => {
        setContainerHeight(height);
        })
    }
    if(mainView.current){
            mainView.current.measure((x,y, height, width, px, py) => {
            setMainX(px); 
            setMainWidth(width); 
            setMainY(py); 
            setMainHeight(height);
            })
    }
  }, [mainHeight, mainX, mainY, mainWidth])


 


  const valer = fadeAnim.interpolate({
    inputRange:[0,1],
    outputRange:['white','green'], 
 })

  function measureMain(gesture){
    
    if(gesture.nativeEvent.pageY > mainY && gesture.nativeEvent.pageY < mainY + mainHeight && gesture.nativeEvent.pageX > mainX && gesture.nativeEvent.pageX < mainX + mainWidth){
      return true;   
    }      
    return false; 
  }

  

  const firstTemplate = () => {
       if(demo.length){
         return <View>
         
           {demo[index].profilePic ? <Image source = {{uri:demo[index].profilePic}} style = {{height:80, width:80, borderRadius:40}}/>:<MaterialIcons name="account-circle" size={80} color="black" />} 
         
         <Text style = {{alignSelf:'center', fontWeight:'bold', fontSize:25, marginTop:5}}>{demo[index].name}</Text>
         
         </View>
       }
  }
  const secondTemplate = () => {
       if(demo.length){
        return <View>
         
        {demo[index + 1].profilePic ? <Image source = {{uri:demo[index + 1].profilePic}} style = {{height:80, width:80, borderRadius:40}}/>:<MaterialIcons name="person" size={80} color="black" />} 
      
      <Text style = {{alignSelf:'center', fontWeight:'bold', fontSize:25, marginTop:5}}>{demo[index + 1].name}</Text>
      
      </View>
       }
  }
  const incrementIndex = () => {
    if(index + 1 < demo.length -1 ) {
        setIndex(index + 1)
   }
  }
  const questionsIndexIncrement = () => {
      if(questionsIndex < questions.length - 1){
           setQuestionsIndex(questionsIndex + 1); 
      } 
  }
  const onDragRelease = (gesture) => {
    const measured = measureMain(gesture); 
    if(measured){
       incrementIndex();   
       questionsIndexIncrement(); 
       fadeIn()
       fadeOp()
    }
    
  }
  
  
  
  return (
    <View style={{flex:1, paddingBottom:insets.bottom}}>
            <View style = {{flex:0.3, backgroundColor:'blue'}}>
            
            </View>
            <View style = {{flex:0.3, backgroundColor:'yellow'}}>
            <Animated.View ref = {mainView}  style = {{position:'absolute', left:width - 300, backgroundColor:valer, height:200, width:200, borderRadius:100, justifyContent: 'center',alignItems:'center'}}>
            <MaterialIcons name="person" size={180} color="black" />
            </Animated.View>    
            <Animated.View style = {{opacity:fadeOpac, position:'absolute', top:10, right:60}}>
            <View style = {{flexDirection:"row", alignItems:'center'}}>
           <Text style = {{fontWeight:"bold"}}>+1</Text> 
           <MaterialCommunityIcons name="lightbulb-on" size={24} color="black" />
           </View>
           <Text>{questions[questionsIndex].dimension}</Text>   
            </Animated.View>
            </View>
            
            <View style = {{flex:0.4, }} ref = {mailer}>
           <Draggable x={30} y={containerHeight - 250} isCircle  onDragRelease = {(gesture) => onDragRelease(gesture)} shouldReverse = {true}>
               {firstTemplate()}
           </Draggable>    
           <Draggable x={width - 130} y={containerHeight - 250}  isCircle  onDragRelease = {(gesture) => {onDragRelease(gesture)}} shouldReverse >
               {secondTemplate()}
           </Draggable>    
           </View> 
          
          
          
    </View>
  );
};

export default PlayGameLatest;

const styles = StyleSheet.create({
  container: {flex:1}
});
