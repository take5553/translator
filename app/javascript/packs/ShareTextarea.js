import React, {Component} from 'react';
import {DropdownButton, MenuItem} from 'react-bootstrap';

export class ShareTextarea extends Component {
    render() {
        return (
            <div className="shareTextarea">

                <p className="p-heading--share">この訳をシェアして添削してもらおう</p>
                <DropdownButton title="list" id="ddb">
                    <MenuItem>aaa</MenuItem>
                    <MenuItem>bbb</MenuItem>
                    <MenuItem>ccc</MenuItem>
                </DropdownButton>
                <div className="l-divide">
                    <textarea className="p-textarea--source" id="resultInputShare" placeholder="ベストだと思う翻訳結果をペーストするか、オリジナルの英訳を入力してシェアしよう"/>
                </div>


                <div className="l-divide">
                    <button type="button" className="p-button--situation">シチュエーションを追加<br/>（オプション）</button>
                </div>
                <div className="l-divide">
                    <label htmlFor="resultInputSituation">シチュエーション（オプション）</label><br/>
                    <textarea className="p-textarea--source" id="resultInputSituation" placeholder="例：ビジネスのメール、友達との会話、大学のレポート など"/>
                </div>

                <div className="l-divide">
                    <button type="submit" className="p-button--share" disabled>この訳をシェアして<br/>添削してもらおう</button>
                    <button type="submit" className="p-button--share">この訳をシェアして<br/>添削してもらおう</button>
                </div>

            </div>
        );
    };
};


