import {getDocs, collection, deleteDoc, doc} from "firebase/firestore"
import { useEffect, useState } from "react";
import { auth, db } from "../services/firebase";

const Home = ({isAuth}) => {
    const [post, setPost] = useState([]);
    const postCollectionRef = collection(db, "posts")

    const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id)
    await deleteDoc(postDoc)
    window.location.reload();
    }

    useEffect(() => {
    const renderNewPost = async () => {
    const data = await getDocs(postCollectionRef);
    const collect = data.docs.map((doc) => ({...doc.data(), id: doc.id}))
    setPost(collect)
    }

    renderNewPost();

    }, [])

    return (
        <>
        {post.map((newpost) => (
        <article className="max-w-2xl px-6 py-10 mx-auto space-y-14">
	    <div className="w-full mx-auto space-y-4">
		<h1 className="text-5xl font-bold leading-none">{newpost.title}</h1>
		<p className="text-sm border-b">by
				<span> {newpost.author.name}</span>
		</p>
	</div>
	<div>
		<p className="mb-3 text-gray-500 font-medium">{newpost.description}</p>
	</div>
       {isAuth && newpost.author.id === auth.currentUser.uid && ( <button onClick={() => deletePost(newpost.id)} className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Delete</button> )}
    </article>
            ))}
        </>
    )
}

export default Home;