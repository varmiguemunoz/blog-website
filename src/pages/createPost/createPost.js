import { useEffect, useState } from "react";
import { db, auth } from "../../services/firebase";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const CreatePost = ({ isAuth }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('')

    const postCollectionRef = collection(db, "posts")
    const navigate = useNavigate();

    const createPost = async () => {
    try {
    await addDoc(postCollectionRef, {title: title, description: description, author: {name: auth.currentUser.displayName, id: auth.currentUser.uid}});
    navigate('/');
    } catch(err) {
    setError(err.message)
    }
    }

    useEffect(() => {
    if (!isAuth) {
    navigate('/login')
    }
    }, [])

    return (
        <div className="mt-9">
            {error &&
            <div>
                <h1>{error}</h1>
            </div>}

    <section class="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md">
        <h2 class="text-lg font-semibold text-gray-700 capitalize">Create you own post!</h2>

        <div class="grid justify-center item-center grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
                <label class="text-gray-700">Title</label>
               <input placeholder="Insert Title" onChange={(e) => setTitle(e.target.value)} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"/>
            </div>

            <div>
                <label class="text-gray-700">Content Description</label>
                 <textarea placeholder="Insert Description" onChange={(e) => setDescription(e.target.value)} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"/>
            </div>

        </div>

        <div class="flex justify-end mt-6">
            <button class="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600" onClick={createPost}>Save</button>
        </div>

</section>
</div>
    )
}

export default CreatePost;