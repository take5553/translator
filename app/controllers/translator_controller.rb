class TranslatorController < ApplicationController

  require "zlib"

  def index
  end

  def result
  	translated = (ogp_params[:translated]).gsub("'", "\\\\'")
    @imageName = Zlib.crc32(translated)
    if not FileTest.exist?(Rails.root.join("app", "assets", "images", "ogp", "#{@imageName}.png"))
      image = OgpCreator.build(translated, @imageName)
      puts "Image has been generated..."
    end
    @originalText = ogp_params[:originalText]
    @situation = ogp_params[:situation]

  end

  def ogp_params
    params.permit(:translated, :originalText, :situation)
  end
end
