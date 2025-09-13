Peerly — MVP Product Specification

1. Product Goals
- Connect learners and teachers (or both) within UK cities.
- Simple, fast onboarding (<2 minutes).
- Deliver relevant, high-quality matches.
- Provide safe communication through DMs with report/block.
- Measure success with activation and engagement metrics.

Primary KPI
- % of new users who send/receive at least 1 Save/DM/Request in their first day.

Secondary KPIs
- Profile completion rate
- Response rate to DMs
- Report/block usage

2. User Roles
- Learner: wants to learn skills
- Teacher: offers skills
- Both: can do both

3. Onboarding Flow (Progressive)
First-time users see:
- Welcome screen: "Find your learning community" with value proposition
- Select role: "I want to..." → Learner / Teacher / Both
- Choose skills:
    Learner → "What do you want to learn?" (up to 3 tags)
    Teacher → "What can you teach?" (up to 3 tags)
    Both → Two separate screens for learning and teaching
    Tag picker with recommendations + search
- Select city: "Where are you based?" (dropdown)
- Pick availability: "When do you like to learn?" → weeknights, weekends, mornings, evenings
- Select languages: "What languages do you speak?"
- Profile basics: "Tell us about yourself" → display name, optional bio (120 chars), avatar
- Create account: "Secure your profile" → email, username, password (or Apple login)
    Small "Already have an account? Sign in" link
- Accept safety agreement (checkbox)
- Enable push notifications (optional)
- Land on Discover feed

Returning users see:
- Login screen with "New to Peerly? Join us" link

4. Navigation (tabs at the bottom of the screen)
- Discover → ranked feed of user cards (vertical scroll like instagram posts)
- Search → filter by tags, role, city, language, availability
- Messages → chats (only after accepted friend requests) and pending requests
- Profile → edit profile, view saves, manage preferences

5. Core Features
- Discover
    Vertical feed of cards (same city only)
    Card content: avatar, name, role badge, city, number of friends, tags, languages, availability, bio
    Actions: Save, Send Friend Request
- Search
    Search by name or tag
    Filters: role, city, language, availability
    Results use same card design as Discover
- Friend Requests
    Users can send friend requests to each other
    Recipient can Accept or Decline
    Once accepted, both users appear as friends and can message each other
    Pending requests show in Messages tab under “Requests”
- Messages
    1:1 direct messaging
    Report/block in chat header
- Profile
    Edit personal info, tags, languages, availability
    Manage saved profiles and friends
    Access community guidelines
    Delete account

6. Matching & Ranking
- Users matched by city only
- Ranking score:
    Teach <-> Learn tag overlap
    Language overlap
    Availability overlap
    Recent activity
    Profile completeness
    Diversity: avoid repeating same user or tag cluster

7. Safety
- Report profiles and messages
- Block to hide users completely
- Minimum age: 16+
- GDPR Law: export and delete data (including S3) on request

8. Anti-Spam
- Max 10 friend requests/day
- Unlimited accepts/declines/replies
- Downrank users with high report ratios

9. Analytics
- Track onboarding completion
- Track discover views and card actions
- Track friend requests (sent, accepted, declined)
- Track DMs (messages sent)
- Track reports and blocks

10. Roadmap
- MVP (Now)
    Onboarding
    City-based discover
    Search
    Friend requests and messaging
    Safety features 
    Push notifications
    Analytics
- Post MVP (work on later)
    Group chats
    Pinecone embedding based recommendation searching with cosine similarity?

    Premium Features (Everyone can use the app free. Premium gives daily users useful extras:)
        Restrict incoming friend requests by gender
        Restrict incoming requests by age range 
        Extended daily friend requests from 10 to 100?
        See who saved you feature 
        Boost profile: appear higher in Discover feed and searches

    Refresh tokens reset every 30 days so users are logged out every 30 days no matter what? Add a rolling refresh token (sliding window system) so that every time a client uses a refresh token successfully, the backend issues a new refresh token with a fresh 30-day expiry date. Allowing users to be logged in indefinitely as long as they are using the app consistently