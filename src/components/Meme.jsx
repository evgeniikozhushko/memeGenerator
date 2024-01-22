import React from "react"

export default function Meme() {
    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg",
        topTextPosition: { x: 50, y: 10 }, // Centered and near the top
        bottomTextPosition: { x: 50, y: 90 } // Centered and near the bottom
    })
    const [allMemes, setAllMemes] = React.useState([])
    const [activeTextField, setActiveTextField] = React.useState('topText');
    
    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemes(data.data.memes))
    }, [])
    
    function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }))
        
    }
    
    function handleChange(event) {
        const {name, value} = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
        setActiveTextField(name); // Set active text field
    }

    function moveText(direction) {
        const positionKey = activeTextField + 'Position';
        setMeme(prevMeme => {
            let position = { ...prevMeme[positionKey] };
            // Adjust position based on direction
            switch (direction) {
                case 'up':
                    position.y -= 30;
                    break;
                case 'down':
                    position.y += 30;
                    break;
                case 'left':
                    position.x -= 30;
                    break;
                case 'right':
                    position.x += 30;
                    break;
                default:
                    break;
            }
            return { ...prevMeme, [positionKey]: position };
        });
    }
    
    return (
        <main>
            <div className="form">
                <input 
                    type="text"
                    placeholder="Top text"
                    className="form--input"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                />
                <input 
                    type="text"
                    placeholder="Bottom text"
                    className="form--input"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                />
                <button 
                    className="form--button"
                    onClick={getMemeImage}
                >
                    Get a new meme image 🖼
                </button>
            </div>

            {/* Buttons to move text */}
            <div className="button-group">
                <button onClick={() => moveText('up')}>Move Text Up</button>
                <button onClick={() => moveText('down')}>Move Text Down</button>
                <button onClick={() => moveText('left')}>Move Text Left</button>
                <button onClick={() => moveText('right')}>Move Text Right</button>
            </div>
            <div className="meme">
                <img src={meme.randomImage} className="meme--image" />
                <h2
                className="meme--text top"
                style={{ 
                    top: `${meme.topTextPosition.y}%`, 
                    left: `${meme.topTextPosition.x}%`,
                    transform: 'translate(-50%, -50%)'
                }}>{meme.topText}</h2>
                <h2
                    className="meme--text bottom"
                    style={{
                        top: `${meme.bottomTextPosition.y}%`, 
                        left: `${meme.bottomTextPosition.x}%`,
                        transform: 'translate(-50%, -50%)'
                    }}
                >{meme.bottomText}
                </h2>
            </div>
        </main>
    )
}