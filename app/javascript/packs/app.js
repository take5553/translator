import React, { Component } from 'react';
import ReactDOM from "react-dom";

const API_KEY = "AIzaSyBaFTETfvcumwNBxsewv-OcYqAaxyoI5Jc"

class App extends Component {
    constructor(props) {
        super(props);
        this.translateText = this.translateText.bind(this);

        this.state = {
        	translatedText: "translated text will be here."
        };
    }

    translateText(){
    	let fromLang = 'ja';
    	let toLang = 'en';
    	let text = this.refs.originalText.value;

    	let url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;
    	url += '&q=' + encodeURI(text);
    	url += `&source=${fromLang}`;
    	url += `&target=${toLang}`;

    	fetch(url, {
    		method: 'GET',
    		headers: {
    			"Content-Type": "application/json",
    			accept: "application/json"
    		}
    	})
    	.then(res => res.json())
    	.then((response) => {
    		this.setState({
    			translatedText: response.data.translations[0].translatedText
    		});
    	})
    	.catch(error => {
    		// エラーが起きた時
    		console.log("from google: ", error);
    	});
    }

    render() {
        return (
            <div>
            	<input type="text" ref="originalText" rows="5" />
            	<br />
            	<input type="button" value="翻訳" onClick={this.translateText}/>
            	<p>{this.state.translatedText}</p>
            </div>
        );
    }
}

ReactDOM.render(
	<App />,
	document.getElementById('root')
);