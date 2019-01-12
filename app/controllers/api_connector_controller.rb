# coding: utf-8

class ApiConnectorController < ApplicationController

  require 'httpclient'
  require 'json'
  require 'base64'
  require 'cgi'

  def text_params
  	params.permit(:text)
  end

  # //////////////////////////////////////////////////////////
  # 
  # 目次
  #
  # connectApiGoogle (メインアクション)
  #  └translate_text_google(origin_text, source, target)　(サブメソッド)
  #
  # connectApiBing (メインアクション)
  #  └translate_text_bing(origin_text, source, target)　(サブメソッド)
  #
  # connectApiWatson (メインアクション)
  #  └translate_text_watson(origin_text, source, target)　(サブメソッド)
  #
  # connectApiYandex (メインアクション)
  #  └translate_text_yandex(origin_text, source, target)　(サブメソッド)
  #
  # 
  # 処理が結構重複してるから一つにまとめたいけど、それぞれ微妙に違うんだよね
  #
  # //////////////////////////////////////////////////////////


  def connectApiGoogle

    from_lang = 'ja'
    to_lang = 'en'
    origin_text = text_params[:text]

	  translatedText = { 
		  "google" => CGI.unescapeHTML(translate_text_google(origin_text, from_lang, to_lang))
	  }

  	render :json => translatedText

  end

  def translate_text_google(origin_text, source, target)

    google_api_key = Rails.application.credentials.api_key[:google]

    endpoint_url = "https://translation.googleapis.com/language/translate/v2"
    querys = {'key' => google_api_key, 'q' => origin_text, 'source' => source, 'target' => target}
    body = ''
    headers = { 'Accept' => 'application/json', 'Content-Type' => 'application/json'}


   	client = HTTPClient.new
    client.debug_dev = $stderr

	  res = client.request('get', endpoint_url, querys, body, headers)

	  return JSON.parse(res.body)["data"]["translations"][0]["translatedText"]

  end

  def connectApiBing
    from_lang = 'ja'
    to_lang = 'en'
    origin_text = text_params[:text]

	  translatedText = { 
		  "bing" => translate_text_bing(origin_text, from_lang, to_lang),
	  }

  	render :json => translatedText

  end

  def translate_text_bing(origin_text, source, target)

    bing_api_key = Rails.application.credentials.api_key[:bing]

    endpoint_url = "https://api.cognitive.microsofttranslator.com/translate"
    querys = {'api-version' => '3.0', 'from' => source, 'to' => target}
    body = [{'text' => origin_text}]
    headers = { 'Content-Type' => 'application/json', 'Ocp-Apim-Subscription-key' => bing_api_key }

   	client = HTTPClient.new
    client.debug_dev = $stderr

	  res = client.request('post', endpoint_url, querys, JSON.generate(body), headers)

	  return JSON.parse(res.body)[0]["translations"][0]["text"]

  end

  def connectApiWatson
    from_lang = 'ja'
    to_lang = 'en'
    origin_text = text_params[:text]

	  translatedText = { 
		  "watson" => translate_text_watson(origin_text, from_lang, to_lang),
	  }

  	render :json => translatedText

  end

  def translate_text_watson(origin_text, source, target)

  	username = 'apikey'
    watson_api_key = Rails.application.credentials.api_key[:watson]
    auth = Base64.strict_encode64(username + ':' + watson_api_key)

    endpoint_url = "https://gateway-tok.watsonplatform.net/language-translator/api/v3/translate"
    querys = {'version' => '2018-05-01'}
    body = {'text' => origin_text, 'model_id' => source + '-' + target}
    headers = { 'Content-Type' => 'application/json', 'Authorization' => 'Basic ' + auth }


   	client = HTTPClient.new
    client.debug_dev = $stderr

	  res = client.request('post', endpoint_url, querys, JSON.generate(body), headers)

	  return JSON.parse(res.body)["translations"][0]["translation"]

  end

  def connectApiYandex
    from_lang = 'ja'
    to_lang = 'en'
    origin_text = text_params[:text]

    translatedText = { 
      "yandex" => translate_text_yandex(origin_text, from_lang, to_lang),
    }

    render :json => translatedText

  end

  def translate_text_yandex(origin_text, source, target)

    yandex_api_key = Rails.application.credentials.api_key[:yandex]

    endpoint_url = "https://translate.yandex.net/api/v1.5/tr.json/translate"
    querys = {'key' => yandex_api_key, 'lang' => source + '-' + target}
    body = {'text' => origin_text}
    headers = { 'Content-Type' => 'application/x-www-form-urlencoded'}


    client = HTTPClient.new
    client.debug_dev = $stderr

    res = client.request('post', endpoint_url, querys, body, headers)

    return JSON.parse(res.body)["text"][0]

  end

end