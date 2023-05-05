import { useEffect, useState } from "react";
import {getDoc,getDocs, doc, collection, deleteDoc} from "firebase/firestore"
import { auth, db } from "../../services/firebase";
import { Link, useNavigate, useParams } from "react-router-dom";

import CommentsArticle from "./components/comments";

const ArticlesPage = ({isAuth}) => {
const [article, setArticle] = useState({});
const [comments, setComments] = useState([]);

const {id} = useParams();
const articleRef = collection(db, 'posts', id, 'comments');

const navigate = useNavigate();

useEffect(() => {
const fecthArticle = async () => {
const articleDoc = doc(db, 'posts', id);
const articleData = (await getDoc(articleDoc)).data();
if (articleData) {
setArticle(articleData)
} else {
navigate('/')
}}

const renderComments = async () => {
    const data = await getDocs(articleRef);
    const collect = data.docs.map((doc) => ({...doc.data(), id: doc.id}))
    setComments(collect)
  }

renderComments();
fecthArticle();

}, [articleRef, id, navigate])

if (!article) {
    return <div>Loading...</div>
}

const deleteComment = async (commentId) => {
  const commentRef = doc(collection(db, 'posts', id, 'comments'), commentId);
  await deleteDoc(commentRef);
}

return (
<div>
    <div className="max-w-2xl px-6 py-10 mx-auto space-y-14">
    <div className="w-full mx-auto space-y-4">
		<h1 className="text-5xl font-bold leading-none">{article.title}</h1>
	</div>
      <p className="mb-3 text-gray-500 font-medium">{article.description}</p>
    </div>
    {comments.map((comment) => (
      <div className="max-w-2xl px-6 py-10 mx-auto space-y-4 border-b">
        <h1 className="text-sm font-serif">@{comment.authorComment.name}</h1>
        <p className="text-gray-700 font-medium">{comment.comment}</p>
        <div>
         {isAuth && comment.authorComment.id === auth.currentUser.uid && (<button onClick={() => deleteComment(comment.id)} className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800">Delete</button> )}
        </div>
      </div>
    ))}
   {!isAuth ?
   <Link to={'/login'}>
   <div className="max-w-2xl px-6 py-10 mx-auto space-y-14">
    <h1 className="text-xl font-bold">Login to post a comment</h1>
   </div>
   
   </Link>
    : <CommentsArticle id={id}/> }
  </div>
)
}

export default ArticlesPage;