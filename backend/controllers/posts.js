import Post from "../models/Post.js";
import User from "../models/User.js";
export async function createPost(req, res) {
    try {
        const {userId, description, picturePath} = req.body;
        const user = await User.findById(userId);
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},
            Comments: [],
        })
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error});
    }

}

//get all posts
export async function getFeedPosts(req, res) {
    try {
        const posts = await Post.find();
        res.status(200).json(posts); 
    } catch (error) {
        console.log(error);
        res.status(500).json({error});
    }
}

//get user posts usin g userId
export async function getUserPosts(req, res) {
    try {
        const {userId} = req.params;
        const posts = await Post.find({userId});
        res.status(200).json(posts); 
    } catch (error) {
        console.log(error);
        res.status(500).json({error});
    }
}

export async function likePost(req, res) {
    try {
        const {id} = req.params;
        const {userId} = req.body;
        const post = await Post.findById(id);
        const isLike = post.likes.get(userId);
        if(isLike){
            post.likes.delete(userId);
        }
        else{
            post.likes.set(userId,true);
        }
        const updatedPost = await Post.findByIdAndUpdate(
            id,
            {likes: post.likes},
            {new: true},
        );
        res.status(200).json(posts); 
    } catch (error) {
        console.log(error);
        res.status(500).json({error});
    }
}

//test for infinity scroll, may try to shuffle posts.
// router.get('/posts', async (req, res) => {
//     const { skip, limit } = req.query;
  
//     try {
//       const posts = await Post.find().skip(parseInt(skip)).limit(parseInt(limit));
//       res.json(posts);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   });

//post list for frontend, will update later 
// const PostList = () => {
//     const [posts, setPosts] = useState([]);
//     const [skip, setSkip] = useState(0);
//     const [loading, setLoading] = useState(true);
  
//     useEffect(() => {
//       const fetchData = async () => {
//         try {
//           const response = await axios.get(`/posts?skip=${skip}&limit=5`);
//           setPosts((prevPosts) => [...prevPosts, ...response.data]);
//           setLoading(false);
//         } catch (error) {
//           console.error(error);
//         }
//       };
  
//       fetchData();
//     }, [skip]);
  
//     const handleScroll = () => {
//       if (
//         window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight
//       ) {
//         setSkip((prevSkip) => prevSkip + 5);
//       }
//     };
  
//     useEffect(() => {
//       window.addEventListener('scroll', handleScroll);
//       return () => {
//         window.removeEventListener('scroll', handleScroll);
//       };
//     }, []);
  
//     return (
//       <div>
//         {posts.map((post) => (
//           <div key={post._id}>
//             {/* Render your post component here */}
//             <p>{post.title}</p>
//           </div>
//         ))}
//         {loading && <p>Loading...</p>}
//       </div>
//     );
//   };
  
//   export default PostList;