import  React, {useState,useRef,useEffect} from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, Share, Platform } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import {firebase} from '../../config'; 
import * as Print from 'expo-print'; 
import { WebView } from 'react-native-webview';
//@refresh reset


interface TryProps {}
const db = firebase.firestore(); 





const Try = ({navigation, routes}) => {
const [name, setName] = useState(); 
const [surname, setSurname] = useState(); 
const [pdfUrl, setPdfUrl] = useState(); 
const namer = useRef('Hamid ansari').current; 


const chaddi = `
<h1>
Hello world
</h1>

`


const htm = `
<!DOCTYPE html>
<html style="font-size: 16px;">
<style>
.icon {
   font-size:40px
}
</style>
<head>
<script src="https://unpkg.com/feather-icons"></script>

</head>
  <div style = "display:flex;margin-top:40px; flex-direction:column;">
  
  <div style = "font-size:80px; align-self:center"> <b> <i> 134 people said </i></b></div>
  <div style = "font-size:80px; MARGIN-TOP:20px; align-self:center"> <b> <i> AMY GUION  </i></b></div>
  <div style = "font-size:50px; MARGIN-TOP:20px; align-self:center"> <b> <i> is INTELLIGENT, GOOD-HEARTED,
    </i></b></div>
    <div style = "font-size:50px; MARGIN-TOP:20px; align-self:center"> <b> <i> and CREATIVE
    </i></b></div>
  <hr style = "width:600; margin-left:40px; margin-right:40px; border-width:3px; margin-top:40px"/>
  <div style = "font-size:80px; align-self:center"> TOP TRAITS</div>
  <hr style = "width:600; margin-left:40px; margin-right:40px; border-width:3px; margin-top:40px"/>
  </div>
  <div style = "break-inside:avoid">
  <div style = "display:flex; flex-direction:row;justify-content:space-between; margin-left:30px; margin-right:30px; margin-top:30px; align-items:center"; >
  <i data-feather="sun"></i>
  <div style = "font-size:70px"> <b> CREATIVITY </b> </div>
  <div style = "display:flex; flex-direction:column; justify-content:center; align-items:center"> 
   <div style = "font-size:70px"> <b>84 </b> </div>
   <div style = "font-size:50px"> <b>votes </b></div>
  </div>
  </div>
  <div style = "display:flex; flex-direction:row;justify-content:space-between; margin-left:30px; margin-right:30px; margin-top:30px; align-items:center"; >
  <div style = "font-size:80px"> icon </div>
  <div style = "font-size:70px"> <b> CHARISMA </b> </div>
  <div style = "display:flex; flex-direction:column; justify-content:center; align-items:center"> 
   <div style = "font-size:70px"> <b>84 </b> </div>
   <div style = "font-size:50px"> <b>votes </b></div>
  </div>
  </div>
  <div style = "display:flex; flex-direction:row;justify-content:space-between; margin-left:30px; margin-right:30px; margin-top:30px; align-items:center"; >
  <i data-feather="circle"></i>
  <div style = "font-size:70px"> <b> HONEST </b> </div>
  <div style = "display:flex; flex-direction:column; justify-content:center; align-items:center"> 
   <div style = "font-size:70px"> <b>84 </b> </div>
   <div style = "font-size:50px"> <b>votes </b></div>
  </div>
  </div>
  <div style = "display:flex; flex-direction:row;justify-content:space-between; margin-left:30px; margin-right:30px; margin-top:30px; align-items:center"; >
  
  <div style = "font-size:80px"> icon </div>
  <div style = "font-size:70px"> <b> HUMOR </b> </div>
  <div style = "display:flex; flex-direction:column; justify-content:center; align-items:center"> 
   <div style = "font-size:70px"> <b>84 </b> </div>
   <div style = "font-size:50px"> <b>votes </b></div>
  </div>
  </div>
  <div style = "display:flex; flex-direction:row;justify-content:space-between; margin-left:30px; margin-right:30px; margin-top:30px; align-items:center"; >
  <div style = "font-size:80px"> icon </div>
  <div style = "font-size:70px"> <b> LOOKS </b> </div>
  <div style = "display:flex; flex-direction:column; justify-content:center; align-items:center"> 
   <div style = "font-size:70px"> <b>84 </b> </div>
   <div style = "font-size:50px"> <b>votes </b></div>
  </div>
  </div>
  <div style = "display:flex; flex-direction:row;justify-content:space-between; margin-left:30px; margin-right:30px; margin-top:30px; align-items:center"; >
  <div style = "font-size:80px"> icon </div>
  <div style = "font-size:70px"> <b> EMPATHETIC </b> </div>
  <div style = "display:flex; flex-direction:column; justify-content:center; align-items:center"> 
   <div style = "font-size:70px"> <b>84 </b> </div>
   <div style = "font-size:50px"> <b>votes </b></div>
  </div>
  </div>  
  <div style = "display:flex; flex-direction:row;justify-content:space-between; margin-left:30px; margin-right:30px; margin-top:30px; align-items:center"; >
  <div style = "font-size:80px"> icon </div>
  <div style = "font-size:70px"> <b> STATUS </b> </div>
  <div style = "display:flex; flex-direction:column; justify-content:center; align-items:center"> 
   <div style = "font-size:70px"> <b>84 </b> </div>
   <div style = "font-size:50px"> <b>votes </b></div>
  </div>
  </div>
  <div style = "display:flex; flex-direction:row;justify-content:space-between; margin-left:30px; margin-right:30px; margin-top:30px; align-items:center"; >
  <div style = "font-size:80px"> icon </div>
  <div style = "font-size:70px"> <b> WEALTHY </b> </div>
  <div style = "display:flex; flex-direction:column; justify-content:center; align-items:center"> 
   <div style = "font-size:70px"> <b>84 </b> </div>
   <div style = "font-size:50px"> <b>votes </b></div>
  </div>
  </div>
  </div>
  <script>
      feather.replace()
    </script>
</html>
`
const share = async() => {
   
}

 const changeNames = async () => {
  const {uri} = await Print.printToFileAsync({html:htm, height:2000});
  let uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
  let imageName = 'mainer.pdf'; 
  const response = await fetch(uri); 
  const blob = await response.blob(); 
  const namer = Math.random().toString(36).substring(2);
  const ref = firebase.storage().ref().child("jagath.pdf"); 
  await ref.put(blob,{contentType:'application/pdf'})
  const result1 = await ref.getDownloadURL(); 
  setPdfUrl(result1)
 }  
useEffect(() => {
  
}, [])


 const PdfReader = ({url:uri}) => <WebView javaScriptEnabled={true} style={{ flex: 1 , justifyContent:'center', alignItems:'center' }} source={{uri}} />
  console.log(pdfUrl)
  return (
    
    <ScrollView contentContainerStyle={{flexGrow:1}}>
    {pdfUrl ?<PdfReader url = {pdfUrl} />:<TouchableOpacity onPress = {() => changeNames()}>
      <Text>Press me </Text>
    </TouchableOpacity>}
  </ScrollView>
  
  );
};

export default Try;

const styles = StyleSheet.create({
  container: { flex:1,backgroundColor:'red'}
});
