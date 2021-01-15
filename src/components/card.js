import axios from "axios";

const Card = (article) => {
   // TASK 5
   // ---------------------
   // Implement this function, which should return the markup you see below.
   // It takes as its only argument an "article" object with `headline`, `authorPhoto` and `authorName` properties.
   // The tags used, the hierarchy of elements and their attributes must match the provided markup exactly!
   // The text inside elements will be set using their `textContent` property (NOT `innerText`).
   // Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
   //
   // <div class="card">
   //   <div class="headline">{ headline }</div>
   //   <div class="author">
   //     <div class="img-container">
   //       <img src={ authorPhoto }>
   //     </div>
   //     <span>By { authorName }</span>
   //   </div>
   // </div>
   //

   const div = document.createElement("div");
   div.className = "card";
   const div1 = document.createElement("div");
   div1.className = "headline";
   div1.textContent = article.headline;
   const div2 = document.createElement("div");
   div2.className = "author";
   const div21 = document.createElement("div");
   div21.className = "img-container";
   const img = document.createElement("img");
   img.src = article.authorPhoto;
   const span = document.createElement("span");
   span.textContent = `By ${article.authorName}`;

   div21.append(img);
   div2.append(div21, span);
   div.append(div1, div2);
   div.addEventListener("click", (e) => console.log(div1.textContent));
   return div;
};

const cardAppender = (selector) => {
   // TASK 6
   // ---------------------
   // Implement this function that takes a css selector as its only argument.
   // It should obtain articles from this endpoint: `https://lambda-times-api.herokuapp.com/articles`
   // However, the articles do not come organized in a single, neat array. Inspect the response closely!
   // Create a card from each and every article object in the response, using the Card component.
   // Append each card to the element in the DOM that matches the selector passed to the function.
   //

   axios
      .get("https://lambda-times-api.herokuapp.com/articles")
      .then((res) => {
         //  console.log(res.data.articles);
         // we figure out the keys of the object and descend one more layer until the article layer, which can be passed to Card() to create and render.
         for (let i of Object.keys(res.data.articles)) {
            res.data.articles[i].forEach((article) => {
               const temp = Card(article);
               // we add a class for filtering content
               temp.classList.add(i);
               document.querySelector(selector).append(temp);
            });
         }
      })
      .catch((err) => console.log(`Error: ${err}`));
};

export { Card, cardAppender };
