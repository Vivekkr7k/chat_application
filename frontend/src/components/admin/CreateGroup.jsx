import React from 'react';
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Input,
  Textarea
} from "@material-tailwind/react";

const CreateGroup = ({ show, handleClose }) => {
  return (
    <Dialog
      open={show}
      handler={handleClose}
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
    >
      <div className="bg-white w-1/2 max-w-md rounded-lg shadow-lg">
        <DialogHeader className="p-4 text-2xl font-semibold border-b border-gray-200">
          Create New Group
        </DialogHeader>
        <DialogBody className="p-6 space-y-6">
          <form className="flex flex-col text-2xl gap-6">
            <div>
              <label htmlFor="groupName" className="block text-lg font-medium text-gray-700">
                Group Name
              </label>
              <Input
                id="groupName"
                type="text"
                placeholder="Enter group name"
                className="w-full mt-1"
              />
            </div>
            <div>
              <label htmlFor="groupMembers" className="block text-lg font-medium text-gray-700">
                Add Member
              </label>
              <Button
                color="blue"
                size="sm"
                variant="outlined"
                className="w-full mt-1 text-lg"
              >
                Select Members
              </Button>
            </div>
            <div>
              <label htmlFor="description" className="block text-lg font-medium text-gray-700">
                Description
              </label>
              <Textarea
                id="description"
                placeholder="Enter Description"
                rows={3}
                className="w-full mt-1"
              />
            </div>
          </form>
        </DialogBody>
        <DialogFooter className="flex justify-end p-4 space-x-2 border-t border-gray-200">
          <Button
            color="red"
            onClick={handleClose}
            className="w-24 rounded-none p-2 text-lg bg-red-500"
          >
            Close
          </Button>
          <Button
            color="blue"
            onClick={handleClose}
            className="w-44 rounded-none p-2 text-lg"
          >
            Create Group
          </Button>
        </DialogFooter>
      </div>
    </Dialog>
  );
}

export default CreateGroup;
