import React, {Component} from 'react';

export class CreateSharePage extends Component {
    render() {
        return (
            <div className="CreateSharePage">
                <h1>「●●●●●●●●●●●●●●●」の訳をシェアして添削してもらおう</h1>

                <img src="http://placehold.jp/50/3d4070/ffffff/1200x1000.png?text=%E3%81%93%E3%81%AE%E8%A8%B3%E3%81%A9%E3%81%86%EF%BC%9F%0A%0A%E3%80%8C%E4%BF%A1%E3%81%98%E3%82%8B%E3%81%8B%E4%BF%A1%E3%81%98%E3%81%AA%E3%81%84%E3%81%8B%E3%81%AF%E3%81%82%E3%81%AA%E3%81%9F%E6%AC%A1%E7%AC%AC%E3%81%A7%E3%81%99%E3%80%82%E3%80%8D%0A%0A%E3%82%B7%E3%83%81%E3%83%A5%E3%82%A8%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%0A%E9%80%9A%E5%B8%B8%E3%81%AE%E4%BC%9A%E8%A9%B1%0A%0AIt%20is%20up%20to%20you%20whether%20you%20believe%20or%20not.%0A%0A%E3%81%84%E3%81%84%E3%81%AD%EF%BC%81%E2%86%92%20%E2%99%A1Likes%0A%E6%94%B9%E5%96%84%E3%81%AE%E4%BD%99%E5%9C%B0%E3%81%82%E3%82%8A%20%E2%86%92%20%E6%B7%BB%E5%89%8A%E4%BB%98%E3%81%8DRT" alt=""/>


                <div className="l-divide">
                    <a href="https://twitter.com/intent/tweet?text=テキストテキスト%0a改行もできるし%20スペースも&url=https://www.url.url/&hashtags=タグ,二つ目&via=x_tubuan_x" rel="nofollow" className="twitter-link">
                        Twitterに投稿
                    </a>
                    <a href="https://twitter.com/share?text=テキストテキスト%0a改行もできるし%20スペースも&url=https://www.url.url/&hashtags=タグ,二つ目" rel="nofollow" className="twitter-link">
                        twitterでshare
                    </a>
                    <br/>
                    <button type="submit" className="p-button--negative">戻る</button>
                </div>


            </div>
        );
    };
};


