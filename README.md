
# Report for FED2 Semester Project - HoliDaze


- [Brief](https://fed-vocational-astro-course.vercel.app/en/semester-project-2/brief)
- [Design](https://www.figma.com/file/7OvbYcHJlwXwIhIi2av17v/BidVista?type=design&node-id=24%3A8136&mode=design&t=fi9ZsqslvjvGWAs5-1)
- [Production deploy](https://bidvista.netlify.app/)


## Design

### Initial Design
The initial design was created using Figma, focusing on mobile view since the primary use case is mobile-based. The goal was to create a visually appealing and user-friendly interface. I aimed to use icons to save space and improve navigation.

### Implementation Challenges
Despite my initial plans, the final design differed significantly from the Figma design. I faced difficulties in effectively utilizing Tailwind CSS, which impacted the final appearance of the website. While Tailwind CSS offers rapid styling, I struggled to achieve the desired design, resulting in a more functional but less polished interface. Ultimately, the design is at least viewable on all screen sizes.

## Home View

The home page adjusts its content based on the user's authentication status. If signed in, users see their credit at the top of the screen. If not, they are prompted to sign in or sign up. The page displays a listing of 30 venues. Although I attempted to make this number customizable, I was unable to implement the feature in time. A search function allows users to filter through the displayed venues. Initially, I planned to fetch new data with each search, but this approach increased loading times, so I opted for client-side filtering instead.

## Venue Listing

Each venue listing includes a countdown timer showing the end time, formatted from the data received from the API. The creation date is also formatted for readability. Tags and images are displayed individually, with images shown in a carousel format. Each listing displays the current bid, highest bidder, and seller information. Users can view profiles of both the seller and bidders. Depending on the user's status, options to edit or delete listings are available, although the corresponding functionality is not yet implemented.

## Placing Bookings

The booking feature was challenging, particularly regarding the input method for selecting bid amounts. Initially, I wanted to include buttons to adjust the bid by increments of 10 and 100, but space constraints in the mobile view led me to simplify this to increments of 1. The current design has bugs, such as starting at 0 and requiring an initial value input before adjustment. Additionally, I implemented sounds to indicate the success or failure of placing a bid.

## Profile View

The profile view allows users to update their profile image and view their wallet/credit, created listings, and wins. I intended to use tabs to separate listings and wins but encountered difficulties styling the component from Flowbite.

## Conclusion

The project was enjoyable and provided valuable experience working with extensive data and API interactions. The documentation was clear, facilitating the implementation of required functionalities. Unfortunately, I could not add testing, workflow enhancements, or other sorting functions due to time constraints and a delayed start caused by personal circumstances.

Despite the design challenges and incomplete features, the core functionality of HoliDaze meets the specified user stories and technical restrictions. The project demonstrates my ability to implement complex features and handle large datasets, even if the final design requires further refinement.
