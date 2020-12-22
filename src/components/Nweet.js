import React, {useState} from 'react';
import { dbService } from "../firebase";

const Nweet = ({nweetObj, isOwner}) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);

    const deleteHandler = () => {
        const ok = window.confirm("Are you sure you want delete this nweet?");
        if (ok === true) {  
            dbService.doc(`nweets/${nweetObj.id}`).delete();
        }
    }

    const toggleEditing = () => setEditing((prev) => !prev);
    const onSubmit = (e) => {
        e.preventDefault();
        console.log(nweetObj);
        dbService.doc(`nweets/${nweetObj.id}`).update({
            text: newNweet,
        });
        setEditing(false);
    }
    const onChange = (e) => {
        const {target:{value}} = e;
        setNewNweet(value);
    }

    return (
        <div key={nweetObj.id}>
            {
                editing ? (
                    <>
                    <form onSubmit={onSubmit}>
                        <input type="text" placeholder="Edit your nweet" onChange={onChange} value={newNweet} required />
                        <input type="submit" value="Update Nweet"/>
                    </form>
                    <button onClick={toggleEditing}>Cancle</button>
                    </>
                )
                :
                (
                    <>
                    <h4>{nweetObj.text}</h4>
                    {isOwner && (
                    <>
                        <button onClick={deleteHandler}>Delete Nweet</button>
                        <button onClick={toggleEditing}>Edit Nweet</button>
                    </>
                    )}
                    </>
                )
            }
        </div>
    )
}

export default Nweet;