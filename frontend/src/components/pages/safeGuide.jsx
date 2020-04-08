import React, { Component } from 'react';
import axios from 'axios';

class SafeGuide extends Component {
    render(){
        return (
            <div>
                <div className = "block-example border border-dark m-2">
                    <input type="text" placeholder="Search.."></input>
                    <hr></hr>
                    <input type="radio" id="locSearch" 
                    name="searchType" value="locSearch"></input>
                        <label htmlFor="locSearch">By Location:  </label>

                    <input type="radio" id="ghoSearch" 
                    name="searchType" value="ghoSearch"></input>
                        <label htmlFor="locSearch">By Ghost:  </label>

                    <input type="radio" id="sigSearch" 
                    name="searchType" value="sigSearch"></input>
                        <label htmlFor="locSearch">By Sighting:  </label>
                    </div>


                    <div className = "block-example border border-dark m-2">
                        <p>
                            SAFEGUIDE TO DO

                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when a
                            n unknown printer took a galley of type and scrambled it to make a type specimen book. It 
                            has survived not only five centuries, but also the leap into electronic typesetting, remaining es
                            sentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing L
                            orem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including ver
                            sions of Lorem Ipsum.
                        </p>
                        <p>
                        
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when a
                            n unknown printer took a galley of type and scrambled it to make a type specimen book. It 
                            has survived not only five centuries, but also the leap into electronic typesetting, remaining es
                            sentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing L
                            orem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including ver
                            sions of Lorem Ipsum.
                        </p>
                        <p>
                        
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when a
                            n unknown printer took a galley of type and scrambled it to make a type specimen book. It 
                            has survived not only five centuries, but also the leap into electronic typesetting, remaining es
                            sentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing L
                            orem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including ver
                            sions of Lorem Ipsum.
                        </p>
                    </div>
                </div>
    );
    }
}

export default SafeGuide;