import { useState } from "react";
import { useForm } from "../hooks/useform";
import { db, auth } from "../../../services/firebase";
import { addDoc, collection, doc } from "firebase/firestore";
import { Link } from "react-router-dom";

const CommentsArticle = ({id}) => {
    const userComment = useForm({type: 'text'});
    const [error, setError] = useState('');
    const [event, setEvent] = useState('');

    const articleRef = doc(collection(db, 'posts'), id);

    const submitComment = async () => {
        try {
            await addDoc(collection(articleRef, 'comments'), {comment: userComment.value, authorComment: {name: auth.currentUser.displayName, id: auth.currentUser.uid}});
            } catch(err) {
            setError(err.message)
            }
    }

    return (
<div className="max-w-2xl px-6 py-10 mx-auto space-y-14">
        {error && <div> <h1>{error}</h1> </div>}
<form onSubmit={(e) => setEvent(e.preventDefault())}>
   <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50">
       <div className="px-4 py-2 bg-white rounded-t-lg">
           <label for="comment" className="sr-only">Your comment</label>
           <textarea id="comment" rows="4" className="w-full px-0 text-sm text-gray-900 bg-white border-0 focus:ring-0 " placeholder="Write a comment..."
        {...userComment}></textarea>
       </div>
       <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
           <button type="submit" onClick={submitComment} className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800">
               Post comment
           </button>
           <div className="flex pl-0 space-x-1 sm:pl-2">
               <button type="button" className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100">
                   <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"></path></svg>
                   <span className="sr-only">Upload image</span>
               </button>
           </div>
       </div>
   </div>
</form>
<p className="ml-auto text-xs text-gray-500">Contributions <Link to="https://github.com/varmiguemunoz/blog-website" className="text-blue-600 hover:underline">Here</Link></p>

</div>

    )
}

export default CommentsArticle;