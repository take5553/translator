import React, { Component } from 'react';
import ReactDOM from "react-dom";

const API_KEY = "AIzaSyBaFTETfvcumwNBxsewv-OcYqAaxyoI5Jc";
// const ACCESS_TOKEN = "ya29.c.ElpYBmJNOKuQ-02Tjy6VQovUWx5TIVfjM7WL6GAIrf5u69-Xzu97NHXk5weo3l9-FoDWxr77926sxb62IPYP6Hv6OtkYo4DyHKTNHv6h0Y7CU589QJc-7s08nYk";

class App extends Component {
    constructor(props) {
        super(props);
        this.translateText = this.translateText.bind(this);

        this.state = {
        	translatedText: "translated text will be here."
        };
    }

    translateText(){
    	// let fromLang = 'ja';
    	// let toLang = 'en';
    	// let text = this.refs.originalText.value;

    	// let url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;
    	// url += '&q=' + encodeURI(text);
    	// url += `&source=${fromLang}`;
    	// url += `&target=${toLang}`;

        // let url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;
        let url = 'https://translation.googleapis.com/language/translate/v2';

        let data = {
            key: API_KEY,
            q: this.refs.originalText.value,
            source: 'ja',
            target: 'en',
            format: 'text'
        };

    	fetch(url, {
    		method: 'POST',
    		headers: {
                "X-HTTP-Method-Override": "GET"
    			// "Content-Type": "application/json",
    			// accept: "application/json",
                // "Authorization": `Bearer ${ACCESS_TOKEN}`
    		},
            body: JSON.stringify(data)
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