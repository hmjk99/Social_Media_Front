const Nav = (props)=>{
    return(
    <>
    <div className="header"><img src="https://i.imgur.com/Nvxelxh.png" alt="" />
        <div id="nav">
            <h3 id='home' onClick={props.showHome}>Home</h3>
            <h3 id='profile' onClick={props.showProfile}>Profile</h3>
        </div>
        </div>
        </>
    )
}

export default Nav