# Distance and Even Dust
This is a project for [NaNoGenMo 2022](https://github.com/NaNoGenMo/2022/issues/43). In this book, my goal was to use Perlin noise to create new pages for a novel by wandering the three-dimensional space of an existing novel. I take the title from a passage in Gertrude Stein's *Tender Buttons* (1914), and the novel I used for the source is *[Tibby: A novel dealing with psychic forces and telepathy by Rosetta Luce Gilchrist](https://www.gutenberg.org/ebooks/69307)* (1904), by Rosetta Luce Gilchrist. (I don't know anything about this book. I just pulled it randomly from Gutenberg to have something to experiment with, but I grew to like seeing the snippets come through.)

To produce this, I used P5.js, which is not known for its text-handling capabilities, but I found its implementation of `noise()` pretty straightforward, and I found the `map()` and `random()` functions pretty convenient. My [JavaScript](sketch.js) code generates DOM elements and then feeds all that to Bindery.js to make it look like a book.

In this repository, I have included the JS file, an HTML file with the necessary libraries included by CDN, a copy of *Tibby*, and a sample novel. You can also view a live version hosted on p5js.org. 

## Advice for Reading
The premise of the book is that, when the noise is smooth enough, the letters are more likely to be drawn from the same page or nearby pages. I have structured the book such that the chapters near the middle (12 and 13) are smoother, so these will be nearly readable. Pages nearer to the beginning and end will not be readable in a conventional way, but may be interesting to look at.

