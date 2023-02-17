const eleventySass = require("@11tyrocks/eleventy-plugin-sass-lightningcss");
const CleanCSS = require("clean-css");
const Image = require("@11ty/eleventy-img");


module.exports = function(eleventyConfig) {
    eleventyConfig.addPlugin(eleventySass);
    eleventyConfig.addWatchTarget("./src/css/");

    eleventyConfig.addFilter("cssmin", function(code) {
        return new CleanCSS({}).minify(code).styles;
    });

    eleventyConfig.addPassthroughCopy("./src/css/");

    eleventyConfig.addShortcode("image", imageShortcode);


    // Return your Object options:
    return {
        dir: {
            input: "src",
        }
    }
};

function imageShortcode(src, cls, alt, sizes, widths) {
    let options = {
        widths: widths,
        formats: ['avif', 'webp'],
        outputDir: "./_site/images/optimized",
        urlPath: "/images/optimized/",
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

// async function imageShortcode(src, alt, sizes) {
//     console.log(src)
//     let metadata = await Image(src, {
//         widths: [null],
//         formats: ["webp", "jpeg"],
//         outputDir: "./_site/images/optimized",
//         urlPath: "/images/optimized/",
//     });
//     console.log({metadata})
//     let imageAttributes = {
//         alt,
//         sizes,
//         loading: "lazy",
//         decoding: "async",
//     };
//     console.log({imageAttributes})
//     console.log({"html": Image.generateHTML(metadata, imageAttributes) })
//     return Image.generateHTML(metadata, imageAttributes);
// }
