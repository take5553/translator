class TranslatorController < ApplicationController

  require "zlib"
  require "cgi"

  def index
  end

  def result
  	@translatedText = ogp_params[:translated]
    translated = (ogp_params[:translated]).gsub("'", "\\\\'")
    @imageName = Zlib.crc32(translated)
    if not FileTest.exist?(Rails.root.join("app", "assets", "images", "ogp", "#{@imageName}.png"))
      image = OgpCreator.build(translated, @imageName)
      puts "Image has been generated..."
    end
    @originalText = ogp_params[:originalText]
    @situation = ogp_params[:situation]
    
    @resultUrl = @originalText
    @resultUrl << "/"
    @resultUrl << @translatedText
    @resultUrl << "/"

    render :layout => 'resultlayout'
  end

  def ogp_params
    params.permit(:translated, :originalText, :situation)
  end
end
