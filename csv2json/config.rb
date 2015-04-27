
css_dir = "./public/css"
sass_dir = "./public/scss"
images_dir = "./public/img"
javascripts_dir = "./public/js"

asset_cache_buster :none

if (environment == :production)
  output_style = :expanded
else
  output_style = :expanded
end

cache = false
relative_assets = true
line_comments = false
