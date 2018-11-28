import React, {Component} from 'react';
import ReactDOM from "react-dom";
import base64 from 'base-64';

import {Header} from './Header';
import {Footer} from './Footer';

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

        // 各メソッドの中で使われるthisを固定（Watsonも一応コードの中に書いておきます）
        this.translateText = this.translateText.bind(this);
        this.translateTextGoogle = this.translateTextGoogle.bind(this);
        this.translateTextWatson = this.translateTextWatson.bind(this);
        this.translateTextBing = this.translateTextBing.bind(this);
        this.translateTextYandex = this.translateTextYandex.bind(this);

        this.copyText = this.copyText.bind(this);
        this.handleChange = this.handleChange.bind(this);

        // stateを初期化
        this.state = {
            translatedTextGoogle: "",
            translatedTextWatson: "",
            translatedTextBing: "",
            translatedTextYandex: "",
            copiedText: "",
            fromLang: "ja",
            toLang: "en"
        };

    }

    // （要改良）本来なら各メソッドはFunctional ComponentとしてAppクラスの外に記述すべき
    // 各メソッド一括実行
    translateText(){
        this.translateTextGoogle();
        this.translateTextBing();
        this.translateTextYandex();

        // Watsonは使用見送り
        // this.translateTextWatson();
    }

    translateTextGoogle(){

        // 変数定義
        let Google_API_KEY = "AIzaSyBaFTETfvcumwNBxsewv-OcYqAaxyoI5Jc";　// （要改良）Keyはここに書くべきではない

        // URL生成
        let url = `https://translation.googleapis.com/language/translate/v2?key=${Google_API_KEY}`;
        url += '&q=' + encodeURI(this.refs.originalText.value);
        url += `&source=${this.state.fromLang}`;
        url += `&target=${this.state.toLang}`;

        // ヘッダー生成
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('accept', 'application/json');

        // API接続
        fetch(url, {
            method: 'GET',
            headers: headers
        })
        .then(res => res.json())
        .then((response) => {
            // API接続に成功した時
            this.setState({
                translatedTextGoogle: response.data.translations[0].translatedText
            });
        })
        .catch(error => {
            // エラーが起きた時
            console.log("from google: ", error);
        });
    }

    // Watsonは使用見送り
    translateTextWatson(){

        // 変数定義
        let API_Version = '2018-05-01';
        let username = 'apikey';
        let Watson_API_KEY = 'q8aZU1VEmZc3CX3ZYVchqB5sx7JWJoTC1zMEiWQirNfz'; // （要改良）Keyはここに書くべきではない

        // URL生成
        let url = `https://gateway-tok.watsonplatform.net/language-translator/api/v3/translate?version=${API_Version}`;

        // ヘッダー生成
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Basic ' + base64.encode(username + ":" + Watson_API_KEY));

        // API接続
        fetch(url, {
            method: 'POST',
            headers: headers,
            mode: 'cors',
            body: JSON.stringify({
                "text": this.refs.originalText.value,
                "model_id": this.state.fromLang + "-" + this.state.toLang
            })
        })
        .then(response => response.json())
        .then(response => {
            //API接続に成功した時
            this.setState({
                translatedTextWatson: response.translations[0].translation
            });
        })
        .catch((error) => {
            // エラーが起きた時
            console.log("from Watson: ", error);
        });

    }

    translateTextBing(){

        // 変数定義
        let Bing_API_KEY = 'ebe00a413bbc4d018d0be45c82e36c5b'; // （要改良）Keyはここに書くべきではない

        // URL生成
        let url = 'https://api.cognitive.microsofttranslator.com/translate?api-version=3.0';
        url += `&from=${this.state.fromLang}`;
        url += `&to=${this.state.toLang}`;

        // ヘッダー生成
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Ocp-Apim-Subscription-Key', Bing_API_KEY);

        // API接続
        fetch(url, {
            method: 'POST',
            headers: headers,
            mode: 'cors',
            body: JSON.stringify([{
                "text": this.refs.originalText.value
            }])
        })
        .then(response => response.json())
        .then(response => {
            // API接続が成功した時
            this.setState({
                translatedTextBing: response[0].translations[0].text
            });
        })
        .catch((error) => {
            // エラーが起きた時
            console.log("from Bing: ", error);
        });

    }

    translateTextYandex(){

        // 変数定義
        let Yandex_API_KEY = 'trnsl.1.1.20181128T113924Z.81786ca64c5af8cb.1574994c787928cd943636a74e202ba2e5cd1f60'; // （要改良）Keyはここに書くべきではない

        // URL生成
        let url = 'https://translate.yandex.net/api/v1.5/tr.json/translate';
        url += `?key=${Yandex_API_KEY}`;
        url += `&lang=${this.state.fromLang}-${this.state.toLang}`;

        // ヘッダー生成
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        // API接続
        fetch(url, {
            method: 'POST',
            headers: headers,
            mode: 'cors',
            body: `text=${this.refs.originalText.value}`
        })
        .then(response => response.json())
        .then(response => {
            // API接続が成功した時
            this.setState({
                translatedTextYandex: response.text[0]
            });
        })
        .catch((error) => {
            // エラーが起きた時
            console.log("from Yandex: ", error);
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


                                            <textarea ref="translatedTextGoogle" value={this.state.translatedTextGoogle} className="p-textarea--result" id="resultInputGoogle"/>
                                            <button type="button" onClick={this.copyText} className="p-clipboard__button" data-original-title="テキストをコピー">コピー</button>

                                        </div>
                                    </section>
                                    <section className="p-result__item">
                                        <label htmlFor="resultInputBing" className="p-result__label">Bing</label>
                                        <div className="p-result__clipboard">
                                            <textarea value={this.state.translatedTextBing} className="p-textarea--result" id="resultInputBing"/>
                                            <button className="p-clipboard__button" data-original-title="テキストをコピー">コピー</button>
                                        </div>
                                    </section>
                                    <section className="p-result__item">
                                        <label htmlFor="resultInputWatson" className="p-result__label"><s>Watson</s>Yandex</label>
                                        <div className="p-result__clipboard">
                                            <textarea value={this.state.translatedTextYandex} className="p-textarea--result" id="resultInputWatson"/>
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