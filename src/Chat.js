import React,{useState, useEffect} from 'react'
import {db} from './firebaseConfig'
import {
    collection,
    addDoc,
    orderBy,
    query,
    onSnapshot,
    serverTimestamp
} from 'firebase/firestore'
import Bubble from './Bubble';

const Chat = () => {
    const [name, setName] = useState('');
    const [userId, setUserId] = useState('');
    const [tempName, setTempName] = useState('');
    const [newMessage, setNewMessage] = useState('');
    const [message, setMessage] = useState([]);

    const startChat = () => {
        //id
        const id = makeid(10);
        setUserId(id);
        setName(tempName)

    }


    function makeid(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
          counter += 1;
        }
        return result;
    }

    useEffect(() =>{
        const q = query(collection(db, 'messages'), orderBy('timestamp'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setMessage(snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })))
        })
        return () => unsubscribe();
    },[])

    const addNewMessage = async() => {
        if(newMessage !=='' && name !== '' && userId !==''){
            try {
                
                await addDoc(collection(db, 'messages'), {
                    text: newMessage,
                    name: name,
                    userId: userId,
                    timestamp: serverTimestamp()
                })
                setNewMessage('')
            } catch (error) {
                console.log(error.message)
                
            }

        }else{
            console.log('all inputs are requird')
        }
    }
      
  return (
    <div className='container'>
        <div className='row' style={{marginTop:30}}>
            <div className='col-lg-3 form_container'>

                {
                    name ? (<>
                         <h5>Welcome {name}</h5>
                         <textarea onChange={(e) => {setNewMessage(e.target.value)}} 
                         placeholder='Type your message...' 
                         style={{marginBottom:20}}
                         className='from-control'>{newMessage}</textarea>
                         <button onClick={addNewMessage} className='btn btn-warning'>Submit</button>
                        
                    </>) : (<>
                        <h5>Register to chat</h5>

                        <input 
                            placeholder='type your chat Name...'
                            className='form-control input'
                            type='text'
                            value={tempName}
                            onChange={(e) => {setTempName(e.target.value)}}

                        />
                        <button onClick={startChat} className='btn btn-warning'>Start Chat</button>
                    </>)
                }

            </div>
            <div className='col-lg-9 message_container'>
                {
                    message.map(msg => (
                    <Bubble msg={msg} userId={userId} />
                    ))
                }

            </div>
        </div>
    </div>
  )
}

export default Chat