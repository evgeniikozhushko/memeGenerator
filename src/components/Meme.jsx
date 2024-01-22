import React from "react"

export default function Meme() {
    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg",
        topTextPosition: { x: 0, y: 0 },
        bottomTextPosition: { x: 0, y: 0 } 
    })
    const [allMemes, setAllMemes] = React.useState([])
    
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
    }
    
    function moveText(textName, direction) {
        setMeme(prevMeme => {
            let position = { ...prevMeme[textName + 'Position'] };
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
            return { ...prevMeme, [textName + 'Position']: position };
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
            {/* Buttons to move top text */}
        <div className="button-group">
            <button onClick={() => moveText('topText', 'up')}>Move Top Text Up</button>
            <button onClick={() => moveText('topText', 'down')}>Move Top Text Down</button>
            <button onClick={() => moveText('topText', 'left')}>Move Top Text Left</button>
            <button onClick={() => moveText('topText', 'right')}>Move Top Text Right</button>
        </div>
        {/* Buttons to move bottom text */}
        <div className="button-group">
            <button onClick={() => moveText('bottomText', 'up')}>Move Bottom Text Up</button>
            <button onClick={() => moveText('bottomText', 'down')}>Move Bottom Text Down</button>
            <button onClick={() => moveText('bottomText', 'left')}>Move Bottom Text Left</button>
            <button onClick={() => moveText('bottomText', 'right')}>Move Bottom Text Right</button>
        </div>
            <div className="meme">
                <img src={meme.randomImage} className="meme--image" />
                <h2
                className="meme--text top"
                style={{ top: meme.topTextPosition.y + 'px', left: meme.topTextPosition.x + 'px' }}>{meme.topText}</h2>
                <h2
                    className="meme--text bottom"
                    style={{ top: meme.bottomTextPosition.y + 'px', left: meme.bottomTextPosition.x + 'px' }}
                >{meme.bottomText}
                </h2>
            </div>
        </main>
    )
}