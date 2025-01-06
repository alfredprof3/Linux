/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => HomeworkPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian3 = require("obsidian");

// src/modal.ts
var import_obsidian2 = require("obsidian");

// src/suggestModal.ts
var import_obsidian = require("obsidian");
var SuggestFileModal = class extends import_obsidian.SuggestModal {
  constructor(app, onSubmit) {
    super(app);
    this.onSubmit = onSubmit;
  }
  getSuggestions(query) {
    const files = this.app.vault.getMarkdownFiles();
    return files.filter(
      (file) => file.name.toLowerCase().includes(query.toLowerCase())
    );
  }
  renderSuggestion(file, el) {
    var _a;
    el.createEl("div", { text: file.name });
    el.createEl("small", { text: (_a = file.parent) == null ? void 0 : _a.name });
  }
  onChooseSuggestion(file, evt) {
    this.result = file;
    this.onSubmit(this.result);
  }
};

// src/modal.ts
var HomeworkModal = class extends import_obsidian2.Modal {
  constructor(app, plugin) {
    super(app);
    const { contentEl } = this;
    this.plugin = plugin;
    this.headingClass = contentEl.createEl("div", { cls: "header" });
    this.loadClass = contentEl.createEl("div");
  }
  async onOpen() {
    const { contentEl } = this;
    await this.plugin.loadHomework();
    this.editMode = false;
    this.creating = false;
    const headingText = this.headingClass.createEl("h1", { text: "Homework", cls: "header-title" });
    const editButton = this.headingClass.createEl("div", { cls: "header-edit-button" });
    (0, import_obsidian2.setIcon)(editButton, "pencil");
    this.loadSubjects();
    editButton.addEventListener("click", (click) => {
      if (this.creating == false) {
        this.editMode = !this.editMode;
        this.loadSubjects();
        if (this.editMode) {
          (0, import_obsidian2.setIcon)(editButton, "book-open");
        } else {
          (0, import_obsidian2.setIcon)(editButton, "pencil");
        }
      } else {
        new import_obsidian2.Notice("Please complete prompt first.");
      }
    });
  }
  onClose() {
    const { contentEl } = this;
    contentEl.empty();
  }
  async loadSubjects() {
    this.loadClass.empty();
    if (this.editMode) {
      const subjectsHeading = this.loadClass.createEl("div", { cls: "subjects-heading" });
      const addSubjectButton = subjectsHeading.createEl("div", { cls: "add-subject" });
      addSubjectButton.createEl("p", { text: "Add a subject" });
      addSubjectButton.addEventListener("click", (click) => {
        if (this.creating == false) {
          let onPromptFinish = function(object) {
            const subjectText = inputText.value.trim();
            if (subjectText.length <= 32) {
              if (!object.plugin.data[subjectText]) {
                if (subjectText != "") {
                  object.plugin.data[subjectText] = {};
                } else {
                  new import_obsidian2.Notice("Subject must have a name.");
                }
              } else {
                new import_obsidian2.Notice("Cannot create duplicate subject.");
              }
            } else {
              new import_obsidian2.Notice("Must be under 32 characters.");
            }
            object.plugin.saveHomework();
            object.loadSubjects();
            object.creating = false;
            return;
          };
          this.creating = true;
          const promptClass = subjectsHeading.createEl("div", { cls: "subject-prompt" });
          promptClass.createEl("p", { text: "New subject" });
          const inputText = promptClass.createEl("input", { type: "text", cls: "subject-prompt-input" });
          inputText.focus();
          inputText.addEventListener("keydown", (event) => {
            if (event.key == "Enter") {
              onPromptFinish(this);
            }
          });
          const confirmSubject = promptClass.createEl("div", { cls: "subject-prompt-confirm" });
          (0, import_obsidian2.setIcon)(confirmSubject, "check");
          confirmSubject.addEventListener("click", (click2) => {
            onPromptFinish(this);
          });
        } else {
          new import_obsidian2.Notice("Already creating new subject.");
        }
      });
    }
    for (const subjectKey in this.plugin.data) {
      let newSubjectClass = this.loadClass.createEl("div", { cls: "subject" });
      let subjectHeading = newSubjectClass.createEl("div", { cls: "subject-heading" });
      let subjectName = subjectHeading.createEl("div", { text: subjectKey, cls: "subject-heading-name" });
      if (this.editMode) {
        let removeSubjectButton = subjectHeading.createEl("div", { cls: "subject-heading-remove" });
        (0, import_obsidian2.setIcon)(removeSubjectButton, "minus");
        subjectHeading.insertBefore(removeSubjectButton, subjectName);
        removeSubjectButton.addEventListener("click", (click) => {
          Reflect.deleteProperty(this.plugin.data, subjectKey);
          this.plugin.saveHomework();
          newSubjectClass.empty();
        });
      } else {
        let newTaskButton = subjectHeading.createEl("div", { cls: "subject-heading-add" });
        (0, import_obsidian2.setIcon)(newTaskButton, "plus");
        newTaskButton.addEventListener("click", (click) => {
          if (this.creating == false) {
            let onPromptFinish = function(object) {
              const taskText = inputText.value.trim();
              if (taskText.length <= 100) {
                if (!object.plugin.data[subjectKey][taskText]) {
                  if (taskText != "") {
                    object.plugin.data[subjectKey][taskText] = {
                      page,
                      date: dateField.value
                    };
                    object.createTask(newSubjectClass, subjectKey, taskText);
                  } else {
                    new import_obsidian2.Notice("Must have a name.");
                  }
                } else {
                  new import_obsidian2.Notice("Cannot create duplicate task.");
                }
              } else {
                new import_obsidian2.Notice("Must be under 100 characters.");
              }
              object.plugin.saveHomework();
              object.creating = false;
              promptClass.empty();
            };
            this.creating = true;
            let page = "";
            const promptClass = newSubjectClass.createEl("div", { cls: "task-prompt" });
            const flexClassTop = promptClass.createEl("div", { cls: "task-prompt-flextop" });
            const inputText = flexClassTop.createEl("input", { type: "text", cls: "task-prompt-flextop-input" });
            const confirmTask = flexClassTop.createEl("div", { cls: "task-prompt-flextop-confirm" });
            (0, import_obsidian2.setIcon)(confirmTask, "check");
            inputText.focus();
            const flexClassBottom = promptClass.createEl("div", { cls: "task-prompt-flexbottom" });
            const suggestButton = flexClassBottom.createEl("div", { text: "File", cls: "task-prompt-flexbottom-suggest" });
            const dateField = flexClassBottom.createEl("input", { type: "date", cls: "task-prompt-flexbottom-date" });
            suggestButton.addEventListener("click", (click2) => {
              new SuggestFileModal(this.app, (result) => {
                page = result.path;
                suggestButton.setText(result.name);
              }).open();
            });
            inputText.addEventListener("keydown", (event) => {
              if (event.key == "Enter") {
                onPromptFinish(this);
              }
            });
            confirmTask.addEventListener("click", (click2) => {
              onPromptFinish(this);
            });
          } else {
            new import_obsidian2.Notice("Already creating task.");
          }
        });
      }
      if (!this.editMode) {
        for (const taskKey in this.plugin.data[subjectKey]) {
          this.createTask(newSubjectClass, subjectKey, `${taskKey}`);
        }
      }
    }
  }
  createTask(subjectClass, subjectKey, taskName) {
    let taskClass = subjectClass.createEl("div", { cls: "task" });
    let taskButton = taskClass.createEl("div", { cls: "task-check" });
    let filePath = this.plugin.data[subjectKey][taskName].page;
    let taskText;
    if (filePath == "") {
      taskText = taskClass.createEl("div", { text: taskName, cls: "task-text", parent: taskButton });
    } else {
      taskText = taskClass.createEl("div", { text: taskName, cls: "task-link", parent: taskButton });
    }
    let dateValue = this.plugin.data[subjectKey][taskName].date;
    if (dateValue != "") {
      let date = new Date(this.plugin.data[subjectKey][taskName].date);
      var dateArr = date.toDateString().split(" ");
      var dateFormat = dateArr[2] + " " + dateArr[1] + " " + dateArr[3];
      let taskDate = taskClass.createEl("div", { text: dateFormat, cls: "task-date", parent: taskText });
      if (new Date() > date && new Date().toDateString() != date.toDateString()) {
        taskDate.style.color = "var(--text-error)";
      }
    }
    taskText.addEventListener("click", (click) => {
      if (filePath != "") {
        let file = this.app.vault.getAbstractFileByPath(filePath);
        if (file instanceof import_obsidian2.TFile) {
          this.app.workspace.getLeaf().openFile(file);
          this.close();
        }
      }
    });
    taskButton.addEventListener("click", (click) => {
      Reflect.deleteProperty(this.plugin.data[subjectKey], taskName);
      this.plugin.saveHomework();
      taskClass.empty();
    });
  }
};

// src/main.ts
var HomeworkPlugin = class extends import_obsidian3.Plugin {
  async onload() {
    const ribbonToggle = this.addRibbonIcon("book", "Open homework", (evt) => {
      new HomeworkModal(this.app, this).open();
    });
    ribbonToggle.addClass("my-plugin-ribbon-class");
    this.addCommand({
      id: "open-homework",
      name: "Open homework",
      callback: () => {
        new HomeworkModal(this.app, this).open();
      }
    });
  }
  async loadHomework() {
    this.data = Object.assign({}, await this.loadData());
  }
  async saveHomework() {
    await this.saveData(this.data);
  }
};


/* nosourcemap */