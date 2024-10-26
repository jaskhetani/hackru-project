# File to hold tasks for each page, with the page number as the key
tasks_pages = {1: []}
current_page = 1  # Start on page 1

user = input("Name: ")

# Function to add a task to the current page
def addTask():
    task = input("Please enter a task: ")
    if current_page not in tasks_pages:
        tasks_pages[current_page] = []
    tasks_pages[current_page].append(task)
    print(f"Task '{task}' added to page {current_page}.")

# Function to list tasks for the current page
def listTasks():
    if current_page in tasks_pages and tasks_pages[current_page]:
        print(f"Tasks on Page {current_page}:")
        for index, task in enumerate(tasks_pages[current_page]):
            print(f"Task #{index}: {task}")
    else:
        print(f"There are no tasks currently on page {current_page}.")

# Function to delete a task from the current page
def deleteTask():
    listTasks()
    try:
        taskToDelete = int(input("Enter the # of the task to delete: "))
        if 0 <= taskToDelete < len(tasks_pages.get(current_page, [])):
            removed_task = tasks_pages[current_page].pop(taskToDelete)
            print(f"Task '{removed_task}' removed from page {current_page}.")
        else:
            print(f"Task #{taskToDelete} was not found on page {current_page}.")
    except ValueError:
        print("Invalid input. Please enter a number.")

# Function to navigate to the next page
def NextPage():
    global current_page
    current_page += 1
    if current_page not in tasks_pages:
        tasks_pages[current_page] = []  # Initialize a new page if it doesn’t exist
    print(f"Switched to Page {current_page}.")
    listTasks()

# Function to navigate to the previous page
def LastPage():
    global current_page
    if current_page > 1:
        current_page -= 1
    print(f"Switched to Page {current_page}.")
    listTasks()

if __name__ == "__main__":
    # Create a loop to run the app
    print("Welcome to the to-do list app, " + user + ":")
    while True:
        print("\nPlease select one of the following options")
        print("------------------------------------------")
        print("1. Add a new task")
        print("2. Delete a task")
        print("3. List tasks")
        print("N. Next Page")
        print("P. Previous Page")
        print("4. Quit")

        choice = input("Enter your choice: ")

        if choice == "1":
            addTask()
        elif choice == "2":
            deleteTask()
        elif choice == "3":
            listTasks()
        elif choice.upper() == "N":
            NextPage()
        elif choice.upper() == "P":
            LastPage()
        elif choice == "4":
            break
        else:
            print("Invalid input. Please try again.")

    print("Goodbye, " + user)
