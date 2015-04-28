
css_dir = "../csv2json/css"
sass_dir = "./scss"
images_dir = "../csv2json/img"
javascripts_dir = "../csv2json/js"

asset_cache_buster :none

if (environment == :production)
  output_style = :expanded
else
  output_style = :expanded
end

cache = false
relative_assets = true
line_comments = false
