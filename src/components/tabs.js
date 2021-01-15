import axios from "axios";

const Tabs = (topics) => {
   // TASK 3
   // ---------------------
   // Implement this function which takes an array of strings ("topics") as its only argument.
   // As an example, if the topics passed are ['javascript', 'bootstrap', 'technology']
   // then the function returns the markup below.
   // The tags used, the hierarchy of elements and their attributes must match the provided markup!
   // The text inside elements will be set using their `textContent` property (NOT `innerText`).
   //
   // <div class="topics">
   //   <div class="tab">javascript</div>
   //   <div class="tab">bootstrap</div>
   //   <div class="tab">technology</div>
   // </div>
   //

   const div = document.createElement("div");
   div.className = "topics";
   const divs = topics.map((i) => {
      const temp = document.createElement("div");
      temp.className = "tab";
      temp.textContent = i;

      // click a tab to only see that category
      // click again on a filtered tab would then display all tabs back.
      temp.addEventListener("click", (e) => {
         // we define a 'filtered' tab is of 0.65 opacity
         // if the current tab clicked is 'filtered'
         // restore all to default
         if (temp.style.opacity === "0.65") {
            document
               .querySelectorAll(".card")
               .forEach((i) => (i.style.display = "initial"));
            temp.style.opacity = "1";
         } else {
            // else if current tab clicked is not 'filtered'
            // then display only this category of card, set this tab to 'filtered'
            document
               .querySelectorAll(".tab")
               .forEach((i) => (i.style.opacity = "1"));
            temp.style.opacity = "0.65";
            document.querySelectorAll(".card").forEach((i) => {
               i.style.display = "initial";
               if (
                  i.classList.contains(e.target.textContent.split(".")[0]) ===
                  false
               ) {
                  i.style.display = "none";
               }
            });
         }
      });
      return temp;
   });

   div.append(...divs);
   return div;
};

const tabsAppender = (selector) => {
   // TASK 4
   // ---------------------
   // Implement this function which takes a css selector as its only argument.
   // It should obtain topics from this endpoint: `https://lambda-times-api.herokuapp.com/topics`
   // Find the array of topics inside the response, and create the tabs using the Tabs component.
   // Append the tabs to the element in the DOM that matches the selector passed to the function.
   //
   axios
      .get("https://lambda-times-api.herokuapp.com/topics")
      .then((res) => {
         // console.log(res.data.topics);
         document.querySelector(selector).append(Tabs(res.data.topics));
      })
      .catch((err) => console.log(`Error: ${err}`));
};

export { Tabs, tabsAppender };
