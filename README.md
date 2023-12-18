## Resources

- [Brief](https://fed-vocational-astro-course.vercel.app/en/semester-project-2/brief)
- [Design](https://www.figma.com/file/7OvbYcHJlwXwIhIi2av17v/BidVista?type=design&node-id=24%3A8136&mode=design&t=fi9ZsqslvjvGWAs5-1)
- [Production deploy](https://bidvista.netlify.app/)

## Report FED2 Semester Project - Auction

This is my semester project report, where I will be explaining my code and decisions in best way i can. I will be going through my challenges and my solutions to those challanges. The project is design and development of a website for an online auction house which I have named "BisVista".

#### Design:
I started with a figma design for the mobile view, as I would mainly be working in mobile view, this was my only focus. I wanted to go for something easy on the eye and tried to save view space by using icons instead of text based buttons.
While I must add the design in the actual code ended up to be entirely diffrent, for couple of reasons, I was not able to utilize tailwind properly, I am still finding it difficult. I know I could use regular CSS but tailwind is really good if you need to be quick.
The design I ended up with is in the least viewable in all screensizes.

#### Home view
Based on wether or not the user is signed in, the home page will show a bar at the top which sticks at the top of the screen on scroll, if signed inn one can view their credit and if not they wil be asked to either sign in or sign up. 
In whichever case of these, one can view a listing group of 30, I tried to make this number choosable by user but was unable and no time to implement the feature.
The is a search feature that was done mainly to go through the 30 list which is already provided. I tried to make a new fetch with every search bu was unable to do so in a way that would not make loading longer.

#### Listing
Every listing shown contains the end time of a listing as a countdown formatted from the data received from API. As well as formatted created date. All listing tags are shown as individual HTML tags, this does however require the data of tags to be an array to work. Same for images, as a carousel is added.
Every listing also shows current bid and highest bidder, as well as the seller, with possibility to view both profiles. 
Depending on if the sidned in use is the one viewing the listing, on has a possibility to edit or delete the listing, although I have not made the code for the them yet.

#### Placing bids
This is where I was conflicted a bit with how one could chooce the amount to bid. Originally I wanted to have a button to add or detract 10 and 100 but I could not make room for the in mobile view so I did ot get that far. So I ended up with adding and detracting with 1. The functionality of the actual placing bid works however, again the design could be better but it has bugs. It starts at 0 and one has to initiate a value first before pressing the buttons. I dont know how to fix that.
I also implemented sounds for when one presses 'place bid' button, it differ for when it fails and when it succeeds.

#### Profile view:
In profile view one can view and edit the profile image. As well as other datas such as wallet/credit, listings created and won. I wanted to add tabs at the bottom to show listings and wins but I could not figure out how to style the comonent I used from flowbite.

### Conslution
This was a fun project and I was impressed the amount of data one had to work with. The document was easy to understand and for the most part everything -functionalitywise - went good. I sadly did not have enough time to add testing, workflow or other sort functions. Due to an unfortunate family issue, I was delayed and started the project later than planned.

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
