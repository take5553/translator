import React, {Component} from 'react';
import {Result} from "./Result";
import {AlertCopy} from "./Alert";


export class LanguageSetting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'lang': 'ja'
        };
        this.translateText = this.translateText.bind(this);

        this.state = {
            translatedText: "translated text will be here."
        };
    }

    render() {
        return (
            <div className="LanguageSetting">

                <div className="p-radioGroup" data-toggle="buttons">
                    <label className="p-radioGroup__button active"><input type="radio" name="trans-language" id="option1" autoComplete="off" defaultChecked="checked" ref="lang" value="jatoen"/>日本語→英語</label>
                    <label className="p-radioGroup__button"><input type="radio" name="trans-language" id="option2" autoComplete="off" ref="lang" value="entoja"/>英語→日本語</label>
                </div>


                <textarea ref="originalText" className="p-textarea--source" placeholder="英語に翻訳したい文章を入力してください（●●字以内）"/>
                <button type="button" className="p-button--submit" onClick={this.translateText}>翻訳</button>


                <Result/>
                <AlertCopy/>

            </div>
        );
    };
};

