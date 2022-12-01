var lines;
var pages = [[""]];
var chapterCount = 26; 
// nb it will actually be one fewer because it
// starts with Chaper 1.

var wordCount = 0;

function preload() {
  lines = loadStrings("tibby.txt");
}

function setup() {
  noCanvas();

  // add lines 40 at a time to the pages array
  while (lines.length > 0) {
    let l = lines.shift();
    if (pages[pages.length - 1].length < 40) {
      pages[pages.length - 1].push((l += " ".repeat(75 - l.length)));
    } else {
      pages.push([(l += " ".repeat(75 - l.length))]);
    }
  }

  // pad the last page with blank lines
  while (pages[pages.length - 1].length < 40) {
    pages[pages.length - 1].push(" ".repeat(75));
  }

  // the Bindery container stuff
  let content = createElement("div");
  content.attribute("id", "content");

  // set the title
  content.child(createElement("h1", "Distance<br>and<br>Even<br>Dust"));
  content.child(createElement("h4"));
  // add epigraph
  content.child(
    createElement(
      "p",
      "<br><br>If lilies are lily white if they exhaust noise and distance and even dust, if they dusty will dirt a surface that has no extreme grace, if they do this and it is not necessary it is not at all necessary if they do this they need a catalogue.<br><br>~ Gertrude Stein"
    )
  );
  content.child(createElement("h4"));
  content.child(createElement("h4"));
  // the main loop
  for (let c = 1; c < chapterCount; c++) {
    // set the noiseInterval for this chapter
    let noiseInterval = abs(map(c, 1, chapterCount, -0.03, 0.03)) + 0.003;

    // chapter Title
    content.child(createElement("h2", "Chapter " + c + ":"));

    // add pages
    let pageCount = random([5, 7, 9, 11, 13, 15]);
    for (let p = 0; p < pageCount; p++) {
      let output = [[""]];
      let yOff = p * noiseInterval;

      for (let y = 0; y < 40; y++) {
        let xOff = p * noiseInterval;
        output[y] = "";
        for (let x = 0; x < 75; x++) {
          let l =
            pages[floor(map(noise(xOff, yOff), 0, 1, 0, pages.length))][y][x];

          output[y] += l;
          xOff += noiseInterval;
        }
        yOff += noiseInterval;
      }

      if (p == 0) {
        let rL = random(output).split(" ");
        let rStart = floor(random(0, rL.length * 0.4));
        let rEnd = floor(random(rL.length * 0.6, rL.length));
        let chapterTitle =
          rL
            .slice(rStart, rEnd)
            .join(" ")
            .replace(/[“”.,\/#$%\^&\*;:{}=\-_`~()]/g, "")
            .replace(/\s+$/, "") + ".";
        while (chapterTitle.length < random(4, 8)) {
          chapterTitle += ".";
        }
        content.child(createElement("h3", chapterTitle));
        content.child(createElement("h4", "(" + noiseInterval + ")"));
      }

      let formatted = output.join("\n");
      wordCount += formatted.split(" ").length;
      content.child(createElement("pre", formatted));
    }
  }
  console.log("Word Count: " + wordCount);
  let ti = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
  // Appendix
  content.child(createElement("h3", "Appendix"));
  content.child(
    createElement(
      "p",
      "This book was created by using <code>noise()</code> to determine which page of an existing book to select letters from. Because of <code>noise()</code> is apparently random but relatively smooth, stepping through the offset at lower intervals increases the likelihood that two contiguous letters will be chosen from the same page. That smoothness increases toward the center of this book as the offset interval decreases toward 0.001.<br><br>The source text for this work is <u>Tibby: A novel dealing with psychic forces and telepathy by Rosetta Luce Gilchrist</u> (1904) by Rosetta Luce Gilchrist. The book's title and epigraph from Gertrude Stein's <u>Tender Buttons</u> (1914).<br><br>This version of <u>distance and even dust</u> was generated on <strong>" + ti + "</strong>. It contains about " + wordCount + " words.")
  );

  Bindery.makeBook({
    content: "#content",
    pageSetup: {
      margin: { top: "50pt", inner: "30pt", outer: "30pt", bottom: "20pt" },
    },
    rules: [
      Bindery.PageBreak({
        selector: "h1",
        position: "after",
      }),
      Bindery.PageBreak({
        selector: "h4",
        position: "after",
      }),
      Bindery.PageBreak({
        selector: "pre",
        position: "after",
      }),
      Bindery.RunningHeader({
        render: function (pageInfo) {
          if (pageInfo.number > 4) {
            return pageInfo.isLeft
              ? `${pageInfo.number} · ${pageInfo.heading.h2}`.replace(":", "")
              : `${pageInfo.heading.h4} · ${pageInfo.number}`.replace(
                  /[\(\)]/gi,
                  ""
                );
          } else {
            return "";
          }
        },
      }),
    ],
  });
}
