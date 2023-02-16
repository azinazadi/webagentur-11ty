const eleventySass = require("@11tyrocks/eleventy-plugin-sass-lightningcss");
const CleanCSS = require("clean-css");
const Image = require("@11ty/eleventy-img");


module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("./src/css/");
    eleventyConfig.addWatchTarget("./src/css/");
    eleventyConfig.addPlugin(eleventySass);

    eleventyConfig.addShortcode("image", imageShortcode);

    eleventyConfig.addFilter("cssmin", function(code) {
        return new CleanCSS({}).minify(code).styles;
    });

    // Return your Object options:
    return {
        dir: {
            input: "src",
            output: "out"
        }
    }
};

function imageShortcode(src, cls, alt, sizes, widths) {
    let options = {
        widths: widths,
        formats: ['jpeg'],
    };

    // generate images, while this is async we don’t wait
    Image(src, options);

    let imageAttributes = {
        class: cls,
        alt,
        sizes,
        loading: "lazy",
        decoding: "async",
    };
    // get metadata even if the images are not fully generated yet
    let metadata = Image.statsSync(src, options);
    return Image.generateHTML(metadata, imageAttributes);
}
