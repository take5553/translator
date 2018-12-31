# coding: utf-8

class TranslatorController < ApplicationController

  require "zlib"
  require "cgi"

  def index
  end

  def result
  	@translatedText = ogp_params[:translated]
    translated = (ogp_params[:translated]).gsub("'", "\\\\'")

    # Twitterに張られたリンクから辿ってきた場合、訳文の中の半角スペースが"+"（プラス）になってしまっているので
    # それを半角スペースに再変換している。
    if translated == translated.gsub(" ", "")
      translated = translated.gsub("+", " ")
    end

    @imageName = Zlib.crc32(translated)

    # 画像生成
    # すでに同じ画像が生成されていたら、2回目は生成しない
    if not FileTest.exist?(Rails.root.join("public", "ogp", "#{@imageName}.png"))
      image = OgpCreator.build(translated, @imageName)
      puts "Image has been generated..."
    end

    @originalText = ogp_params[:originalText]
    @situation = ogp_params[:situation]

    # Twitterにリンクを載せるためには、URLエンコードを2回する必要がある。
    #
    # 例
    # カンマ","は通常は"%2C"にエンコードされるけど、この"%"が上手く認識されないので、"%"だけをさらにエンコードする必要がある。
    # つまりカンマは2回エンコードによって","→"%2C"→"%252C"となる。
    # result.html上でのリンク → twitter上のリンク → result.htmlに戻ってきたとき
    #      "%252C"         →       "%2C"     →    ","                  
    #
    # また、半角スペースは" "→"+"→"%2B"となるが、result.html内のリンクに"%2B"を含めるとエラーとなる。
    # 正しくは"%252B"
    # なので、半角スペースだけは先に"+"に置き換えてから2回エンコードをする必要がある。
    # result.html上でのリンク → twitter上のリンク → result.htmlに戻ってきたとき
    #      "%252B"         →       "%2B"     →    "+"    
    #
    # アンパサンド"&"はツイッター投稿画面上では"&"になっている必要があるため1回エンコードとしている。
    # result.html上でのリンク → twitter上のリンク → result.htmlに戻ってきたとき
    #      "%26"           →       "&"      →    (パラメーターを切り分ける記号)
    #
    # 以下はTwitterへ投稿する用のURLを生成する処理
    escapedOriginalText = "originalText=" + CGI.escape(CGI.escape(@originalText.gsub(/\s/, "+")) + "&")
    escapedTranslatedText = "translated=" + CGI.escape(CGI.escape(@translatedText.gsub(/\s/, "+")) + "&")
    escapedSituation = "situation=" + CGI.escape(CGI.escape(@situation.gsub(/\s/, "+")))

    @resultUrl = escapedOriginalText + escapedTranslatedText + escapedSituation
    # 以上

    render :layout => 'resultlayout'
  end

  def ogp_params
    params.permit(:translated, :originalText, :situation)
  end
end
