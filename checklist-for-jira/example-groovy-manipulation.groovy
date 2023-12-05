import com.onresolve.scriptrunner.runner.customisers.WithPlugin;
@WithPlugin("com.okapya.jira.checklist")
import com.okapya.jira.customfields.*;

def addItemToChecklist() {
    def checklist = getFieldByName("Checklist");

    def checklistItems = ChecklistSerializer.deserializeChecklist((String) checklist.getFormValue());

    ChecklistItem newItem = new ChecklistItem();
    newItem.setName("Howdy");
    checklistItems.add(newItem);

    checklist.setFormValue(ChecklistSerializer.serializeChecklist(checklistItems));
}

addItemToChecklist();