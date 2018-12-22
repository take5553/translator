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
        this.translateTextBing = this.translateTextBing.bind(this);
        this.translateTextWatson = this.translateTextWatson.bind(this);
        this.translateTextYandex = this.translateTextYandex.bind(this);

        this.copyTextGoogle = this.copyTextGoogle.bind(this);
        this.copyTextBing = this.copyTextBing.bind(this);
        this.copyTextWatson = this.copyTextWatson.bind(this);
        this.copyTextYandex = this.copyTextYandex.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.valueCheck = this.valueCheck.bind(this);

        // stateを初期化
        this.state = {
            translatedTextGoogle: "",
            translatedTextBing: "",
            translatedTextWatson: "",
            translatedTextYandex: "",
            copiedText: "",
            fromLang: "ja",
            toLang: "en",
            isSet: false //<- シェア用テキストエリアの値の有無を判別
        };

    }

    // （要改良）本来なら各メソッドはFunctional ComponentとしてAppクラスの外に記述すべき
    // 各メソッド一括実行
    translateText() {
        this.translateTextGoogle();
        this.translateTextBing();
        this.translateTextWatson();
        this.translateTextYandex();
    }

    translateTextGoogle() {

        let text = this.refs.originalText.value;

        let url = '../api_connector/connectApiGoogle';
        url += '?text=' + encodeURI(text);

        // API接続
        fetch(url, {
            method: 'GET',
        })
            .then(res => res.json())
            .then((response) => {
                // API接続に成功した時
                this.setState({
                    translatedTextGoogle: response.google
                });
            })
            .catch(error => {
                // エラーが起きた時
                console.log("error is", error);
            });
    }

    translateTextBing() {

        let text = this.refs.originalText.value;

        let url = '../api_connector/connectApiBing';
        url += '?text=' + encodeURI(text);

        // API接続
        fetch(url, {
            method: 'GET',
        })
            .then(res => res.json())
            .then((response) => {
                // API接続に成功した時
                this.setState({
                    translatedTextBing: response.bing
                });
            })
            .catch(error => {
                // エラーが起きた時
                console.log("error is", error);
            });

    }

    translateTextWatson() {

        let text = this.refs.originalText.value;

        let url = '../api_connector/connectApiWatson';
        url += '?text=' + encodeURI(text);

        // API接続
        fetch(url, {
            method: 'GET',
        })
            .then(res => res.json())
            .then((response) => {
                // API接続に成功した時
                this.setState({
                    translatedTextWatson: response.watson
                });
            })
            .catch(error => {
                // エラーが起きた時
                console.log("error is", error);
            });

    }

    translateTextYandex() {

        let text = this.refs.originalText.value;

        let url = '../api_connector/connectApiYandex';
        url += '?text=' + encodeURI(text);

        // API接続
        fetch(url, {
            method: 'GET',
        })
            .then(res => res.json())
            .then((response) => {
                // API接続に成功した時
                this.setState({
                    translatedTextYandex: response.yandex
                });
            })
            .catch(error => {
                // エラーが起きた時
                console.log("error is", error);
            });

    }


    copyTextGoogle() {
        this.setState({copiedText: this.refs.translatedTextGoogle.value});
        ToastStore.success("Googleからの翻訳をコピーしました", 5000, "p-alert--success");
        rsScroller.scrollToTarget('anchor-shareTextarea');
    }

    copyTextBing() {
        this.setState({copiedText: this.refs.translatedTextBing.value});
        ToastStore.success("Bingからの翻訳をコピーしました", 5000, "p-alert--success");
        rsScroller.scrollToTarget('anchor-shareTextarea');
    }

    copyTextWatson() {
        this.setState({copiedText: this.refs.translatedTextWatson.value});
        ToastStore.success("Watsonからの翻訳をコピーしました", 5000, "p-alert--success");
        rsScroller.scrollToTarget('anchor-shareTextarea');
    }

    copyTextYandex() {
        this.setState({copiedText: this.refs.translatedTextYandex.value});
        ToastStore.success("Yandexからの翻訳をコピーしました", 5000, "p-alert--success");
        rsScroller.scrollToTarget('anchor-shareTextarea');
    }

    handleChange(e) {
        this.setState({copiedText: e.target.textarea});
    }

    valueCheck(e) {
        this.setState({isSet: !!e.target.value});
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
                        <form action="result.html" method="GET">
                            <div className="l-container">

                                <div className="LanguageSetting">

                                    <div className="p-radioGroup" data-toggle="buttons">
                                        <label className="p-radioGroup__button active"><input type="radio" name="trans-language" id="option1" autoComplete="off" defaultChecked="checked" ref="lang" value=""/>日本語→英語</label>
                                        <label className="p-radioGroup__button"><input type="radio" name="trans-language" id="option2" autoComplete="off" ref="lang" value=""/>英語→日本語</label>
                                    </div>


                                    <div className="p-inputOriginal">
                                        <textarea ref="originalText" className="p-textarea--source" name="originalText" placeholder="英語に翻訳したい文章を入力してください（●●字以内）"/>
                                        <button type="button" onClick={this.translateText} className="p-button--submit">翻訳</button>
                                    </div>

                                    <div className="Result">

                                        <section className="p-result__item">
                                            <label htmlFor="resultInputGoogle" className="p-result__label">Google</label>
                                            <div className="p-result__clipboard">
                                                <textarea ref="translatedTextGoogle" value={this.state.translatedTextGoogle} className="p-textarea--result" id="resultInputGoogle"/>
                                                <button type="button" onClick={this.copyTextGoogle} className="p-clipboard__button" data-original-title="テキストをコピー">コピー</button>
                                            </div>
                                        </section>
                                        <section className="p-result__item">
                                            <label htmlFor="resultInputBing" className="p-result__label">Bing</label>
                                            <div className="p-result__clipboard">
                                                <textarea ref="translatedTextBing" value={this.state.translatedTextBing} className="p-textarea--result" id="resultInputBing"/>
                                                <button type="button" onClick={this.copyTextBing} className="p-clipboard__button" data-original-title="テキストをコピー">コピー</button>
                                            </div>
                                        </section>
                                        <section className="p-result__item">
                                            <label htmlFor="resultInputWatson" className="p-result__label">Watson</label>
                                            <div className="p-result__clipboard">
                                                <textarea ref="translatedTextWatson" value={this.state.translatedTextWatson} className="p-textarea--result" id="resultInputWatson"/>
                                                <button type="button" onClick={this.copyTextWatson} className="p-clipboard__button" data-original-title="テキストをコピー">コピー</button>
                                            </div>
                                        </section>
                                        <section className="p-result__item">
                                            <label htmlFor="resultInputWatson" className="p-result__label">Yandex</label>
                                            <div className="p-result__clipboard">
                                                <textarea ref="translatedTextYandex" value={this.state.translatedTextYandex} className="p-textarea--result" id="resultInputYandex"/>
                                                <button type="button" onClick={this.copyTextYandex} className="p-clipboard__button" data-original-title="テキストをコピー">コピー</button>
                                            </div>
                                        </section>
                                    </div>


                                    {/* <div className="p-alert--success" role="alert">
                                    コピーしました
                                </div>*/}

                                </div>

                                <div className="shareTextarea anchor-shareTextarea">

                                    <p className="p-heading--share">この訳をシェアして添削してもらおう</p>

                                    <div className="l-divide">
                                        <textarea value={this.state.copiedText} onChange={this.handleChange} onBlur={this.valueCheck} name="translated" className="p-textarea--source" id="resultInputShare" placeholder="ベストだと思う翻訳結果をペーストするか、オリジナルの英訳を入力してシェアしよう"/>
                                    </div>


                                    <div className="l-divide c-accordion">
                                        <label className="p-button--situation c-accordion__button" htmlFor="situationOption">
                                            シチュエーションを追加<br/>（オプション）
                                        </label>

                                        <input type="checkbox" name="option" className="c-accordion__checkbox" id="situationOption"/>
                                        <div className="c-accordion__body">
                                            <label htmlFor="resultInputSituation">シチュエーション（オプション）</label><br/>
                                            <textarea className="p-textarea--source" id="resultInputSituation" name="situation" placeholder="例：ビジネスのメール、友達との会話、大学のレポート など"/>
                                        </div>
                                    </div>
                                <div className="l-divide">
                                    <button type="submit" className="p-button--share" disabled={this.state.isSet === false && !this.state.copiedText }>この訳をシェアして<br/>添削してもらおう
                                    </button>
                                </div>

                                </div>

                                {/*
                            <hr/>
                            <CreateSharePage/>*/}
                            </div>
                        </form>
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