const Nav = (props)=>{
    return(
        <div id="nav">
            <h3 id='home' onClick={props.showHome}>Home</h3>
            <h3 id='profile' onClick={props.showProfile}>Profile</h3>
        </div>
    )
}

export default Nav