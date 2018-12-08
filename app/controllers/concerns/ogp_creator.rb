# coding: utf-8

class OgpCreator
  require 'mini_magick'  
  BASE_IMAGE_PATH = './app/assets/images/ogpimage_jp_to_en.jpg'
  GRAVITY = 'center'
  TEXT_POSITION = '0,15'
  FONT = './app/assets/fonts/Kingthings Clarity1.1.ttf'
  FONT_SIZE = 33

  def self.build(translated)

    p '...' + translated
    text = prepare_text(translated)
    p text

    image = MiniMagick::Image.open(BASE_IMAGE_PATH)
    image.combine_options do |config|        
      config.font FONT
      config.fill 'black'
      config.gravity GRAVITY
      config.pointsize FONT_SIZE
      config.draw "text #{TEXT_POSITION} '#{text}'"
    end
    image.write './app/assets/images/ogpimage.png'
  end

  private
  def self.prepare_text(text)
    text.to_s.scan(/.{,70} /)[0...6].join("\n")
  end
end