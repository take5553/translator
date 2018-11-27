import React, {Component} from 'react';
import ReactDOM from "react-dom";

const API_KEY = "AIzaSyBaFTETfvcumwNBxsewv-OcYqAaxyoI5Jc";
// const ACCESS_TOKEN = "ya29.c.ElpYBmJNOKuQ-02Tjy6VQovUWx5TIVfjM7WL6GAIrf5u69-Xzu97NHXk5weo3l9-FoDWxr77926sxb62IPYP6Hv6OtkYo4DyHKTNHv6h0Y7CU589QJc-7s08nYk";

import {Header} from './Header'
import {Footer} from './Footer'

//import {LanguageSetting} from "./LanguageSetting";
//import {Result} from "./Result";
//import {AlertCopy} from "./Alert";
//import {ShareTextarea} from "./ShareTextarea";
import {CreateSharePage} from "./CreateSharePage";
//import {DropdownButton, MenuItem} from "react-bootstrap";
import {ToastContainer, ToastStore} from 'react-toasts';
import rsScroller from 'react-smooth-scroller';


class App extends Component {
    constructor(props) {
        super(props);
        this.translateText = this.translateText.bind(this);

        this.state = {
            //translatedText: "translated text will be here."
            translatedText: "",
            copiedText: ""
        };

        this.copyText = this.copyText.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    translateText() {
        // let fromLang = 'ja';
        // let toLang = 'en';
        // let text = this.refs.originalText.value;

        // let url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;
        // url += '&q=' + encodeURI(text);
        // url += `&source=${fromLang}`;
        // url += `&target=${toLang}`;

        rsScroller.scrollToTarget('anchor-result');

        let url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`
        let data = {
            q: this.refs.originalText.value,
            source: 'ja',
            target: 'en',
            format: 'text',
        }

        fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                accept: "application/json",
                // "Authorization": `Bearer ${ACCESS_TOKEN}`
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then((response) => {
                this.setState({
                    translatedText: response.data.translations[0].translatedText,
                });
            })
            .catch(error => {
                // エラーが起きた時
                console.log("from google: ", error);
            });

    }

    copyText() {
        this.setState({copiedText: this.refs.translatedTextGoogle.value});
        ToastStore.success("コピーしました", 5000, "p-alert--success");
        rsScroller.scrollToTarget('anchor-shareTextarea');
    }

    handleChange(e) {
        this.setState({copiedText: e.target.textarea});
    }



    render() {
        return (
            <div>
                {/*<input type="text" ref="originalText" rows="5"/>*/}
                {/*

                <textarea ref="originalText" className="p-textarea--source" placeholder="英語に翻訳したい文章を入力してください（●●字以内）"/>
                <button type="button" className="p-button--submit" onClick={this.translateText}>翻訳</button>
                <textarea value={this.state.translatedText} className="p-textarea--result" id="resultInputGoogle"/>

                <br/>
                <input type="button" value="翻訳" onClick={this.translateText}/>
                <p>{this.state.translatedText}</p>*/}


                <div className="App">
                    <ToastContainer store={ToastStore}/>

                    <Header/>
                    <main role="main" className="l-main">
                        <div className="l-container">

                            <div className="LanguageSetting">

                                <div className="p-radioGroup" data-toggle="buttons">
                                    <label className="p-radioGroup__button active"><input type="radio" name="trans-language" id="option1" autoComplete="off" defaultChecked="checked" ref="lang" value="jatoen"/>日本語→英語</label>
                                    <label className="p-radioGroup__button"><input type="radio" name="trans-language" id="option2" autoComplete="off" ref="lang" value="entoja"/>英語→日本語</label>
                                </div>


                                <textarea ref="originalText" className="p-textarea--source" placeholder="英語に翻訳したい文章を入力してください（●●字以内）"/>
                                <button type="button" onClick={this.translateText} className="p-button--submit">翻訳</button>


                                <div className="Result">

                                    <section className="p-result__ite anchor-result">
                                        <label htmlFor="resultInputGoogle" className="p-result__label">Google</label>
                                        <div className="p-result__clipboard">


                                            <textarea ref="translatedTextGoogle" value={this.state.translatedText} className="p-textarea--result" id="resultInputGoogle"/>
                                            <button type="button" onClick={this.copyText} className="p-clipboard__button" data-original-title="テキストをコピー">コピー</button>

                                        </div>
                                    </section>
                                    <section className="p-result__item">
                                        <label htmlFor="resultInputBing" className="p-result__label">Bing</label>
                                        <div className="p-result__clipboard">
                                            <textarea className="p-textarea--result" id="resultInputBing"/>
                                            <button className="p-clipboard__button" data-original-title="テキストをコピー">コピー</button>
                                        </div>
                                    </section>
                                    <section className="p-result__item">
                                        <label htmlFor="resultInputWatson" className="p-result__label">Watson</label>
                                        <div className="p-result__clipboard">
                                            <textarea className="p-textarea--result" id="resultInputWatson"/>
                                            <button className="p-clipboard__button" data-original-title="テキストをコピー">コピー</button>
                                        </div>
                                    </section>
                                </div>


                                <div className="p-alert--success" role="alert">
                                    コピーしました
                                </div>

                            </div>

                            <div className="shareTextarea">

                                <p className="p-heading--share anchor-shareTextarea">この訳をシェアして添削してもらおう</p>

                                <div className="l-divide">
                                    <textarea value={this.state.copiedText} onChange={this.handleChange} className="p-textarea--source" id="resultInputShare" placeholder="ベストだと思う翻訳結果をペーストするか、オリジナルの英訳を入力してシェアしよう"/>
                                </div>


                                <div className="l-divide c-accordion">
                                    <label className="p-button--situation c-accordion__button">
                                        <input type="checkbox" name="option" className="c-accordion__checkbox"/>
                                        シチュエーションを追加<br/>（オプション）

                                    </label>
                                    <div className="c-accordion__body">
                                        <label htmlFor="resultInputSituation">シチュエーション（オプション）</label><br/>
                                        <textarea className="p-textarea--source" id="resultInputSituation" placeholder="例：ビジネスのメール、友達との会話、大学のレポート など"/>
                                    </div>
                                </div>

                                <div className="l-divide">
                                    <button type="submit" className="p-button--share" disabled>この訳をシェアして<br/>添削してもらおう
                                    </button>
                                    <button type="submit" className="p-button--share">この訳をシェアして<br/>添削してもらおう</button>
                                </div>

                            </div>


                            <hr/>
                            <CreateSharePage/>
                        </div>
                    </main>
                    <Footer/>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);