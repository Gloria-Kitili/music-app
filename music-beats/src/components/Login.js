import React,{ useState} from "react";
import { useNavigate, NavLink } from "react-router-dom";
import '../css/Login.css'

function Login( {setUser} ){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState(null)
    const navigate = useNavigate();

    function handleSubmit(e){
        e.preventDefault()
        const newLogin = {
            username: username,
            password: password,
            
        }
    
        fetch('https://railsapp-soundscape.onrender.com/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newLogin)
        })
        .then((res) => {
            
            if(res.ok) {
                res.json().then((user) => setUser(user)); 
                navigate(`/`); 
            }
            else {
                res.json().then((err) => setErrors("Invalid Username or Password!!"));
                
            }
        })
    }

  


    return(
        <>
         <div className="body_sign">
         <div className="headings">
              <p className="spotifys"><span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-spotify"  viewBox="0 0 16 16">
                            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.669 11.538a.498.498 0 0 1-.686.165c-1.879-1.147-4.243-1.407-7.028-.77a.499.499 0 0 1-.222-.973c3.048-.696 5.662-.397 7.77.892a.5.5 0 0 1 .166.686zm.979-2.178a.624.624 0 0 1-.858.205c-2.15-1.321-5.428-1.704-7.972-.932a.625.625 0 0 1-.362-1.194c2.905-.881 6.517-.454 8.986 1.063a.624.624 0 0 1 .206.858zm.084-2.268C10.154 5.56 5.9 5.419 3.438 6.166a.748.748 0 1 1-.434-1.432c2.825-.857 7.523-.692 10.492 1.07a.747.747 0 1 1-.764 1.288z"/>
                          </svg></span>
                </p>
                <p className="soundscapes"><span>SoundScape</span></p>
              </div>
           <div className="form">
           <form onSubmit = {handleSubmit}>
           <h1 className="welcome">Welcome back!!</h1>
        
        <div className="form-group">

            <label>Username</label>
            <input type="text" 
            required
            name ='username' 
            value = {username}
             className="form-control" 
             placeholder="Enter Preferred Username" 
             onChange ={(e) => setUsername(e.target.value)}/>
        
        </div>

       
        <div className="form-group">
            <label>Password</label>
            <input type="password"
            required
             name ='password'
              value = {password}
               className="form-control"
                placeholder="Enter Your Password"
                 onChange ={(e) => setPassword(e.target.value)}/>
        </div>

        <p style={{color: 'red'}}>{errors}</p>

   
        <button type="submit" className="btn btn-success login">Login</button>
        </form>
        <div className="redirect-login">
            <p><span>Don't have an account?</span></p>
        <NavLink to='/signup'> <p><span>Sign Up</span></p> </NavLink>       
        </div>
        
           </div>
        </div>
        </>
    )
}

export default Login;