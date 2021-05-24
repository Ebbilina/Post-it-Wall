class PostIt {
    /**
     * constructor for creating an instance of a PostIt
     * 
     * @param {string} text 
     * @param {number} id 
     * @param {string} textcolor 
     * @param {number} positionX 
     * @param {number} positionY 
     * @param {number} zIndex 
     * @param {string} paperColor 
     * @param {string} fontSize 
     */
    constructor(text, id, textcolor, positionX, positionY, zIndex, paperColor, fontSize) {
        this.text = text;
        this.id = id;
        this.textcolor = textcolor;
        this.positionX = positionX;
        this.positionY = positionY;
        this.zIndex = zIndex;
        this.paperColor = paperColor;
        this.fontSize = fontSize;
    }
}

export default PostIt;
