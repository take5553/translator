class TranslatorController < ApplicationController

  require "zlib"
  require "cgi"

  def index
  end

  def result
  	@translatedText = ogp_params[:translated]
    translated = (ogp_params[:translated]).gsub("'", "\\\\'")

    if translated == translated.gsub(" ", "")
      translated = translated.gsub("+", " ")
    end

    @imageName = Zlib.crc32(translated)

    if not FileTest.exist?(Rails.root.join("public", "ogp", "#{@imageName}.png"))
      image = OgpCreator.build(translated, @imageName)
      puts "Image has been generated..."
    end
    @originalText = ogp_params[:originalText]
    @situation = ogp_params[:situation]

    escapedOriginalText = "originalText=" + CGI.escape(CGI.escape(@originalText.gsub(/\s/, "+")) + "&")
    escapedTranslatedText = "translated=" + CGI.escape(CGI.escape(@translatedText.gsub(/\s/, "+")) + "&")
    escapedSituation = "situation=" + CGI.escape(CGI.escape(@situation.gsub(/\s/, "+")))
    
    @resultUrl = escapedOriginalText + escapedTranslatedText + escapedSituation

    render :layout => 'resultlayout'
  end

  def ogp_params
    params.permit(:translated, :originalText, :situation)
  end
end
