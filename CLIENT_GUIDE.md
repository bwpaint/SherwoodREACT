# Sherwood's Gallery — Editor Guide

A short, friendly reference for using the admin interface. The admin lives at:

**https://sherwoodsgallery.com/admin**

Bookmark it, save your password to your password manager, and you're ready.

---

## What you can edit

| What | Where in admin | Notes |
|---|---|---|
| Phone, email, address, hours, social links | **Site Settings** | One place, updates everywhere on the site |
| Hero headline, welcome text, CTAs on the home page | **Pages** → "Home" | Block-based, drag to reorder |
| History page text + timeline milestones | **Pages** → "Our History" | Add new milestones any time |
| Artists (bio, portrait, specialty tags) | **Artists** | Order field controls who appears first |
| Galleries (Bluebonnet, Figurative, etc.) | **Galleries** | Edit name, description, hero image; reorder |
| Paintings | **Paintings** | Add images, link to artist + gallery |
| Blog posts | **Posts** | Draft → Published toggle controls visibility |
| Form submissions (contact + inquiry) | **Inbox** → "Form Submissions" | Mark status as Read / Replied / Archived |
| Newsletter signups | **Inbox** → "Newsletter Subscribers" | Export to CSV anytime |
| User accounts | **Admin** → "Users" | Add team members |

---

## Common tasks

### Adding a new painting

1. **Paintings → Create new**
2. Fill in:
   - **Title** (e.g. "Bluebonnets at Sunset")
   - **Artist** — pick from dropdown
   - **Galleries** — tick one or more (Bluebonnet, Landscape, etc.)
   - **Images** — upload at least one; first image is the card thumbnail
   - **Medium** (e.g. "Oil on Canvas")
   - **Dimensions** (e.g. `24" × 36"`)
   - **Year**, **Price**, **Status** (Available / Sold / On Hold)
   - **Price Display:** "Inquire only" (recommended), "Show price", or "Sold"
3. Click **Save**
4. Visit the public site — it appears in the matching gallery section.

### Marking a painting as "Recent Acquisitions"

1. Open the painting
2. Tick **Recent Acquisition** (sidebar)
3. Fill in **Acquired Date** so it sorts correctly
4. Save. It now appears in the Recent Acquisitions section.

### Featuring an artist on the homepage

1. Open the artist
2. Tick **Featured** (sidebar)
3. Save. The artist now appears on the homepage "Featured Artists" row.
4. Only 4 featured artists show on the home; if you mark more, the first 4 by **Order** are shown.

### Publishing a blog post

1. **Posts → Create new**
2. Fill in **Title**, **Slug** (auto-fills), **Excerpt**, **Body** (rich text editor)
3. Upload a **Cover Image** (optional but recommended)
4. When ready, change **Status** to **Published** — the **Published At** date is set automatically.
5. Save. It appears on `/blog` and at `/blog/<slug>`.

### Updating phone, email, or hours

1. **Site Settings** (in sidebar)
2. Edit the field
3. Save. The change appears site-wide within ~60 seconds.

---

## Handling form submissions

When someone submits the contact form:
- It's saved to **Inbox → Form Submissions** with status "New"
- An email is sent to `art@sherwoodsgallery.com`
- If they used an "Inquire" button on a painting, the painting is linked in the submission

To process:
1. Open the submission in admin
2. Read the message; reply via your email client
3. Change status to **Read** or **Replied**
4. Optionally add internal notes in the **Admin Notes** field

---

## Tips

- **Always upload images with alt text.** It's required for accessibility and SEO.
- **Use the Slug field carefully** — once a painting is published, changing the slug breaks any shared links. Slugs auto-generate from the title.
- **Drafts vs. Published:** Posts have a Draft status. Use it to work on something without it going live.
- **Rich text editor:** It supports headings, lists, links, bold/italic, and image embeds. Keep formatting simple.
- **Image sizes are generated automatically:** thumbnail (400px), card (768px), hero (1920px). You only upload one large file.

---

## If something looks wrong

- **A painting I added isn't showing up:** check that you've selected at least one Gallery and uploaded at least one image.
- **My changes aren't appearing on the live site:** wait 60 seconds and reload. If still not showing, try a hard refresh (Ctrl+Shift+R).
- **I can't log in:** click "Forgot password" on the login page, or contact WebWize.
- **A picture won't upload:** check the file size (under 25 MB) and format (JPG, PNG, WebP).

---

## Need help?

Contact **WebWize** — webwizeinc@gmail.com
