import React from "react";

function Header({name}){
    return(
        <div style={{background: "yellow",padding: 20}}>
            <h1>This is {name} Header</h1>
            <p>This Header for learning purpose</p>
        </div>
    );
}

export default Header; 