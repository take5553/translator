# coding: utf-8

class OgpCreator
  require 'mini_magick'  
  BASE_IMAGE_PATH = './app/assets/images/bgi.png'
  GRAVITY = 'west'
  TEXT_POSITION = '20,0'
  FONT = './app/assets/fonts/ipag.ttf'
  FONT_SIZE = 65

  def self.build(origin, situation, translated)

    origin = prepare_text(origin, 13, 3)
    situation = prepare_text(situation, 13, 1)
    translated = prepare_text(translated, 26, 3)
    
    text = "（原文）#{origin}\n"
    text << "（状況）#{situation}\n"
    text << "（訳文）#{translated}"

    image = MiniMagick::Image.open(BASE_IMAGE_PATH)
    image.combine_options do |config|        
      config.font FONT
      config.fill 'white'
      config.gravity GRAVITY
      config.pointsize FONT_SIZE
      config.draw "text #{TEXT_POSITION} '#{text}'"
    end
    image.write './app/assets/images/ogpimage.png'
  end

  private
  def self.prepare_text(text, indention_count, row_limit)
    text.to_s.scan(/.{1,#{indention_count}}/)[0...row_limit].join("\n　　　　")
  end
end