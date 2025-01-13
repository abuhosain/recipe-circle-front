"use client";

import { Button } from "@nextui-org/button";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { Input } from "@nextui-org/input";
import { zodResolver } from "@hookform/resolvers/zod";

import Loading from "@/src/components/UI/Loading";
import { useUser } from "@/src/context/user.provider";
import { useChangePassword } from "@/src/hooks/auth.hook";
import FXForm from "@/src/components/form/FXForm";
import { changePasswordValidationSchema } from "@/src/schemas/login.schema";
import FXInput from "@/src/components/form/FXInput";

const Settings = () => {
  const { user } = useUser();
  const { mutate: handlePasswordChange, isPending } = useChangePassword();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    handlePasswordChange(data);
  };

  return (
    <>
      {isPending && <Loading />}
      <div className="flex flex-col items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
        <h2 className="mb-6 text-3xl font-bold">Account Settings</h2>

        <div className="w-full max-w-3xl">
          {/* Account Preferences Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold">Account Preferences</h3>
            <div className="py-3">
              <Input
                label="Username"
                name="username"
                type="text"
                value={user?.userName}
              />
            </div>
            <div className="py-3">
              <Input
                label="Preferred Language"
                name="language"
                type="text"
                value="English"
              />
            </div>
          </div>

          {/* Security Settings Section */}
          <FXForm
            resolver={zodResolver(changePasswordValidationSchema)}
            onSubmit={onSubmit}
          >
            <div className="mb-6">
              <h3 className="text-lg font-semibold">Security Settings</h3>
              <div className="py-3">
                <FXInput
                  label="Current Password"
                  name="oldPassword"
                  type="password"
                />
              </div>
              <div className="py-3">
                <FXInput
                  label="New Password"
                  name="newPassword"
                  type="password"
                />
              </div>
            </div>

            {/* Notification Settings Section */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold">Notification Settings</h3>
              <div className="py-3">
                <label className="inline-flex items-center">
                  <input
                    className="form-checkbox text-indigo-600"
                    name="emailNotifications"
                    type="checkbox"
                  />
                  <span className="ml-2">Email Notifications</span>
                </label>
              </div>
              <div className="py-3">
                <label className="inline-flex items-center">
                  <input
                    className="form-checkbox text-indigo-600"
                    name="smsNotifications"
                    type="checkbox"
                  />
                  <span className="ml-2">SMS Notifications</span>
                </label>
              </div>
            </div>

            <Button
              className="my-3 w-full rounded-md bg-default-900 font-semibold text-default"
              size="lg"
              type="submit"
            >
              Save Changes
            </Button>
          </FXForm>
        </div>
      </div>
    </>
  );
};

export default Settings;
