import React, {Component} from 'react';

export class Result extends Component {

    render() {
        return (
            <div className="Result">

                <section className="p-result__item">
                    <label htmlFor="resultInputGoogle" className="p-result__label">Google</label>
                    <div className="p-result__clipboard">

                        <textarea className="p-textarea--result" id="resultInputGoogle"/>
                        <button className="p-clipboard__button" data-original-title="テキストをコピー">コピー</button>
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
        );
    };
};


