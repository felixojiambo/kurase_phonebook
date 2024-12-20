# Phonebook Application

A fully interactive Phonebook web application built with Angular (standalone components), Tailwind CSS, and RxJS. This application allows users to view, search, edit, and manage contacts. It supports grouping, favorites, recent contacts, CSV import/export, and dark mode preferences.

## Features

1. **List All Contacts (Alphabetical Order)**  
   - Displays all contacts sorted by last name, then first name.
   - Supports both List and Grid views, with a toggle for user preference.
   - Persists view mode (list or grid) in `localStorage`.

2. **View a Single Contact**  
   - Click on a contact to open a detail modal.
   - Shows full contact details: name, email, phone, address, group, image, etc.

3. **Edit and Update a Contact**  
   - Inline form validation for email and phone fields.
   - Saves changes immediately and updates the UI.

4. **Delete a Contact (Soft Delete)**  
   - Delete individual contacts with confirmation.
   - Soft deletes mark contacts as `deleted` rather than permanently removing them.
   - Bulk delete multiple selected contacts at once.

5. **Search Contacts**  
   - Search bar filters contacts dynamically by name, email, or phone.
   - Immediate results update as you type.

6. **Bulk Deletion**  
   - Checkbox selection on contacts allows bulk deletion.
   - Confirmation dialog to prevent accidental removals.

7. **Homepage Toggle (List or Grid) with Persistence**  
   - User’s chosen layout is saved in `localStorage`.
   - On reload, application remembers last used layout.

8. **Contact Grouping** (Enhanced Feature)  
   - Filter contacts by group (Family, Friends, Work, Other) or view all.

9. **Favorites** (Enhanced Feature)  
   - Mark/unmark contacts as favorites (star icon).
   - Filter by favorites using a toggle button.
   - Separate "Favorites" view available via sidenav navigation.

10. **Import/Export Contacts** (Enhanced Feature)  
    - Export current contacts to CSV format.
    - Import contacts from a CSV file.
    - Sample CSV available for download.

11. **Dark Mode** (Enhanced Feature)  
    - Toggle dark mode with a button.
    - Persistent dark mode preference in `localStorage`.
    - Tailwind’s dark mode class-based approach ensures smooth theme switching.

12. **Recent Contacts** (Enhanced Feature)  
    - Tracks recently viewed contacts.
    - Displays a "Recent Contacts" section for quick access to recently viewed ones.

13. **Settings** (Enhanced Feature)  
    - A dedicated Settings page to manage user preferences (default view mode, dark mode default).
    - Option to clear recent contacts if implemented.

## Project Structure

```
src/
  app/
    components/
      header/
      sidenav/
      contacts/
      contact-detail/
      confirmation-dialog/
      favorites/
      groups/
      import-export/
      settings/
    core/
      models/
        contact.model.ts
      services/
        contact.service.ts
    styles.css
    app.component.ts
    app.routes.ts
main.ts
index.html
tailwind.config.js
...
```

- **app.component.ts**: Main layout, includes header, sidenav, and `<router-outlet>` for page content.
- **header**: Contains search bar, view mode toggle, dark mode toggle.
- **sidenav**: Navigates between Home, Favorites, Groups, Import/Export, and Settings.
- **contacts**: Displays the main list of contacts with filtering, favorites, and bulk actions.
- **favorites**, **groups**, **import-export**, **settings**: Additional pages for enhanced features.
- **contact-detail**, **confirmation-dialog**: Shared modals for viewing details and confirming actions.
- **contact.service.ts**: Manages contact data, search, CRUD operations, and recent contacts.

## Setup and Installation

### Prerequisites

- **Node.js** (v16+)
- **Angular CLI** (v15+)
- **npm** or **yarn** package manager

### Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/felixojiambo/kurase_phonebook.git
   cd kurase_phonebook
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

3. **Tailwind CSS Configuration**:
   Ensure Tailwind is configured in `tailwind.config.js` and `styles.css` as per instructions in the code.  
   Tailwind classes are already integrated in component templates.

4. **Run the Application**:
   ```bash
   ng serve
   ```
   The application runs at `http://localhost:4200`.

## Usage

- **Home (All Contacts)**:  
  Default page showing all contacts. Use the dropdown to filter by group, the favorites toggle to show/hide favorites, and the view mode toggle to switch between list and grid.  
  The search bar on the header filters contacts dynamically.

- **Adding a Contact**:  
  Use code or integrate a button to add contacts. The existing code shows a mock add method; feel free to extend the UI.

- **Editing a Contact**:  
  Click a contact to open the detail modal and click "Edit" to modify fields. Changes apply immediately.

- **Deleting Contacts**:  
  Click the delete button in detail modal or select multiple contacts and click "Bulk Delete."

- **Import/Export**:  
  Navigate to `Import/Export` page (from the sidenav):
  - **Export CSV**: Downloads current contact list.
  - **Import CSV**: Select a CSV to import new contacts.
  - **Download Sample CSV**: Provides a template CSV.

- **Favorites**:
  - Mark/unmark favorites using the star icon.
  - Use the Favorites page to view only favorite contacts.

- **Groups**:
  - Select a group from the dropdown on the contacts page or visit the Groups page to filter by group categories.

- **Recent Contacts**:
  - Recently viewed contacts appear at the top of the Home page for quick access.

- **Settings**:
  - Adjust dark mode default and homepage view mode.
  - Preferences persist in `localStorage`.

## Dark Mode

- Toggle dark mode from the header.
- If enabled, dark mode preference persists, and on reload, the app starts in dark mode.

## CSV Format

**Expected CSV Headers**:
```
firstName,lastName,email,phone,address,group,favorite
```
- `favorite` should be `true` or `false`.
- `group` can be `Family`, `Friends`, `Work`, `Other`, or blank.

## Production Build

```bash
ng build --configuration production
```

Build output is in `dist/phonebook-app`.

## Deployment

- Deploy `dist/phonebook-app` to any static host (e.g., Vercel, Netlify, GitHub Pages).
- Ensure `<base href="/">` is set in `index.html` for correct routing.

## Contributing

- Fork the repository, create a new branch for features or bug fixes.
- Open a pull request with a clear description.

## License

This project is licensed under the MIT License. See `LICENSE` file for details.

---

This README provides a clear understanding of how to set up, run, and use the Phonebook application, including all the features implemented throughout the development process.
