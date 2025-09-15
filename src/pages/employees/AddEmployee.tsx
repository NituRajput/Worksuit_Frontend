import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { RefreshCw, Plus, Info } from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import FormInput from '../../components/form/FormInput';
import FormSelect from '../../components/form/FormSelect';
import FormTextarea from '../../components/form/FormTextarea';
import FormRadioGroup from '../../components/form/FormRadioGroup';
import DateInput from '../../components/form/DateInput';
import PhoneInput from '../../components/form/PhoneInput';
import TagsInput from '../../components/form/TagsInput';
import CurrencyInput from '../../components/form/CurrencyInput';
import UploadAvatar from '../../components/form/UploadAvatar';
// Validation schema
const employeeSchema = z.object({
  employeeId: z.string(),
  salutation: z.string().optional(),
  employeeName: z.string().min(1, {
    message: 'Employee name is required',
  }),
  employeeEmail: z.string().email({
    message: 'Invalid email address',
  }),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters',
  }),
  designation: z.string().min(1, {
    message: 'Designation is required',
  }),
  department: z.string().min(1, {
    message: 'Department is required',
  }),
  country: z.string().optional(),
  countryCode: z.string(),
  phoneNumber: z.string().optional(),
  gender: z.string().optional(),
  joiningDate: z.date({
    required_error: 'Joining date is required',
  }),
  dateOfBirth: z.date().optional().nullable(),
  reportingTo: z.string().optional(),
  language: z.string().optional(),
  userRole: z.string().optional(),
  address: z.string().optional(),
  about: z.string().optional(),
  loginAllowed: z.boolean().default(true),
  emailNotifications: z.boolean().default(true),
  hourlyRate: z.string().optional(),
  slackMemberId: z.string().optional(),
  skills: z.array(z.string()).optional(),
  probationEndDate: z.date().optional().nullable(),
  noticeStartDate: z.date().optional().nullable(),
  noticeEndDate: z.date().optional().nullable(),
  employmentType: z.string().optional(),
  maritalStatus: z.string().optional(),
  businessAddress: z.string().min(1, {
    message: 'Business address is required',
  }),
});
type EmployeeFormData = z.infer<typeof employeeSchema>;
const AddEmployee = () => {
  const navigate = useNavigate();
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      employeeId: 'EMP-' + Math.floor(1000 + Math.random() * 9000),
      salutation: '',
      employeeName: '',
      employeeEmail: '',
      password: '',
      designation: '',
      department: '',
      country: '',
      countryCode: '+1',
      phoneNumber: '',
      gender: '',
      joiningDate: new Date(),
      dateOfBirth: null,
      reportingTo: '',
      language: 'English',
      userRole: 'Employee',
      address: '',
      about: '',
      loginAllowed: true,
      emailNotifications: true,
      hourlyRate: '',
      slackMemberId: '',
      skills: [],
      probationEndDate: null,
      noticeStartDate: null,
      noticeEndDate: null,
      employmentType: '',
      maritalStatus: '',
      businessAddress: '',
    },
  });
  const handleAvatarChange = (file: File | null) => {
    setAvatarFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setAvatarPreview(null);
    }
  };
  const onSubmit = (data: EmployeeFormData) => {
    console.log('Form Data:', data);
    console.log('Avatar File:', avatarFile);
    // In a real app, you would send this data to your API
    // For this demo, we'll just navigate back to the employees list
    navigate('/employees');
  };
  const breadcrumbs = [
    {
      label: 'Employees',
      path: '/employees',
      isLast: false,
    },
    {
      label: 'Add Employee',
      path: '/employees/add',
      isLast: true,
    },
  ];
  return (
    <div>
      <PageHeader title="Add Employee" breadcrumbs={breadcrumbs} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card title="Account Details" className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4">
            <Controller
              name="employeeId"
              control={control}
              render={({ field }) => (
                <FormInput
                  label="Employee ID"
                  {...field}
                  readOnly
                  infoTooltip="Auto-generated employee ID"
                />
              )}
            />
            <Controller
              name="salutation"
              control={control}
              render={({ field: { onChange, value } }) => (
                <FormSelect
                  label="Salutation"
                  options={[
                    {
                      value: 'Mr',
                      label: 'Mr',
                    },
                    {
                      value: 'Mrs',
                      label: 'Mrs',
                    },
                    {
                      value: 'Ms',
                      label: 'Ms',
                    },
                    {
                      value: 'Dr',
                      label: 'Dr',
                    },
                  ]}
                  value={value}
                  onChange={onChange}
                />
              )}
            />
            <Controller
              name="employeeName"
              control={control}
              render={({ field }) => (
                <FormInput
                  label="Employee Name"
                  placeholder="e.g. John Doe"
                  isRequired
                  error={errors.employeeName?.message}
                  {...field}
                />
              )}
            />
            <Controller
              name="employeeEmail"
              control={control}
              render={({ field }) => (
                <FormInput
                  label="Employee Email"
                  placeholder="e.g. johndoe@example.com"
                  isRequired
                  error={errors.employeeEmail?.message}
                  {...field}
                />
              )}
            />
            <div>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <FormInput
                    label="Password"
                    placeholder="Minimum 8 characters"
                    isRequired
                    showPasswordToggle
                    error={errors.password?.message}
                    rightIcon={
                      <button
                        type="button"
                        className="text-amber-500 hover:text-amber-600"
                        onClick={() => {
                          // Generate random password
                          const chars =
                            'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
                          let password = '';
                          for (let i = 0; i < 12; i++) {
                            password += chars.charAt(
                              Math.floor(Math.random() * chars.length)
                            );
                          }
                          field.onChange(password);
                        }}
                      >
                        <RefreshCw size={16} />
                      </button>
                    }
                    {...field}
                  />
                )}
              />
            </div>
            <div>
              <UploadAvatar
                label="Profile Picture"
                value={avatarFile}
                preview={avatarPreview}
                onChange={handleAvatarChange}
                infoTooltip="Upload a profile picture (JPG, PNG)"
              />
            </div>
            <Controller
              name="designation"
              control={control}
              render={({ field: { onChange, value } }) => (
                <FormSelect
                  label="Designation"
                  options={[
                    {
                      value: 'Software Engineer',
                      label: 'Software Engineer',
                    },
                    {
                      value: 'Project Manager',
                      label: 'Project Manager',
                    },
                    {
                      value: 'UI/UX Designer',
                      label: 'UI/UX Designer',
                    },
                    {
                      value: 'HR Manager',
                      label: 'HR Manager',
                    },
                    {
                      value: 'Team Lead',
                      label: 'Team Lead',
                    },
                  ]}
                  value={value}
                  onChange={onChange}
                  isRequired
                  error={errors.designation?.message}
                  rightElement={
                    <Button
                      size="sm"
                      variant="outline"
                      leftIcon={<Plus size={14} />}
                    >
                      Add
                    </Button>
                  }
                />
              )}
            />
            <Controller
              name="department"
              control={control}
              render={({ field: { onChange, value } }) => (
                <FormSelect
                  label="Department"
                  options={[
                    {
                      value: 'Engineering',
                      label: 'Engineering',
                    },
                    {
                      value: 'Design',
                      label: 'Design',
                    },
                    {
                      value: 'Marketing',
                      label: 'Marketing',
                    },
                    {
                      value: 'HR',
                      label: 'HR',
                    },
                    {
                      value: 'Finance',
                      label: 'Finance',
                    },
                  ]}
                  value={value}
                  onChange={onChange}
                  isRequired
                  error={errors.department?.message}
                  rightElement={
                    <Button
                      size="sm"
                      variant="outline"
                      leftIcon={<Plus size={14} />}
                    >
                      Add
                    </Button>
                  }
                />
              )}
            />
            <Controller
              name="country"
              control={control}
              render={({ field: { onChange, value } }) => (
                <FormSelect
                  label="Country"
                  options={[
                    {
                      value: 'US',
                      label: 'United States',
                    },
                    {
                      value: 'UK',
                      label: 'United Kingdom',
                    },
                    {
                      value: 'IN',
                      label: 'India',
                    },
                    {
                      value: 'CA',
                      label: 'Canada',
                    },
                    {
                      value: 'AU',
                      label: 'Australia',
                    },
                  ]}
                  value={value}
                  onChange={onChange}
                />
              )}
            />
            <div>
              <Controller
                name="countryCode"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Controller
                    name="phoneNumber"
                    control={control}
                    render={({ field: phoneField }) => (
                      <PhoneInput
                        label="Mobile"
                        countryCode={value}
                        phoneNumber={phoneField.value ?? ''}
                        onCountryCodeChange={onChange}
                        onPhoneNumberChange={phoneField.onChange}
                        placeholder="e.g. 1234567890"
                      />
                    )}
                  />
                )}
              />
            </div>
            <Controller
              name="gender"
              control={control}
              render={({ field: { onChange, value } }) => (
                <FormSelect
                  label="Gender"
                  options={[
                    {
                      value: 'Male',
                      label: 'Male',
                    },
                    {
                      value: 'Female',
                      label: 'Female',
                    },
                    {
                      value: 'Other',
                      label: 'Other',
                    },
                    {
                      value: 'Prefer not to say',
                      label: 'Prefer not to say',
                    },
                  ]}
                  value={value}
                  onChange={onChange}
                />
              )}
            />
            <Controller
              name="joiningDate"
              control={control}
              render={({ field: { value, onChange } }) => (
                <DateInput
                  label="Joining Date"
                  value={value || undefined}
                  onChange={onChange}
                  isRequired
                  error={errors.joiningDate?.message}
                />
              )}
            />
            <Controller
              name="dateOfBirth"
              control={control}
              render={({ field: { value, onChange } }) => (
                <DateInput
                  label="Date of Birth"
                  value={value || undefined}
                  onChange={onChange}
                />
              )}
            />
            <Controller
              name="reportingTo"
              control={control}
              render={({ field: { onChange, value } }) => (
                <FormSelect
                  label="Reporting To"
                  options={[
                    {
                      value: 'Michael Brown',
                      label: 'Michael Brown',
                    },
                    {
                      value: 'Sarah Johnson',
                      label: 'Sarah Johnson',
                    },
                    {
                      value: 'John Doe',
                      label: 'John Doe',
                    },
                    {
                      value: 'Thomas Anderson',
                      label: 'Thomas Anderson',
                    },
                  ]}
                  value={value}
                  onChange={onChange}
                />
              )}
            />
            <Controller
              name="language"
              control={control}
              render={({ field: { onChange, value } }) => (
                <FormSelect
                  label="Language"
                  options={[
                    {
                      value: 'English',
                      label: 'English',
                    },
                    {
                      value: 'Spanish',
                      label: 'Spanish',
                    },
                    {
                      value: 'French',
                      label: 'French',
                    },
                    {
                      value: 'German',
                      label: 'German',
                    },
                    {
                      value: 'Hindi',
                      label: 'Hindi',
                    },
                  ]}
                  value={value}
                  onChange={onChange}
                />
              )}
            />
            <Controller
              name="userRole"
              control={control}
              render={({ field: { onChange, value } }) => (
                <FormSelect
                  label="User Role"
                  options={[
                    {
                      value: 'Employee',
                      label: 'Employee',
                    },
                    {
                      value: 'Super Admin',
                      label: 'Super Admin',
                    },
                    {
                      value: 'Human Resource',
                      label: 'Human Resource',
                    },
                    {
                      value: 'Manager',
                      label: 'Manager',
                    },
                  ]}
                  value={value}
                  onChange={onChange}
                />
              )}
            />
            <div className="md:col-span-3">
              <Controller
                name="address"
                control={control}
                render={({ field }) => (
                  <FormTextarea
                    label="Address"
                    placeholder="Enter address"
                    rows={3}
                    {...field}
                  />
                )}
              />
            </div>
            <div className="md:col-span-3">
              <Controller
                name="about"
                control={control}
                render={({ field }) => (
                  <FormTextarea
                    label="About"
                    placeholder="Enter details about the employee"
                    rows={3}
                    {...field}
                  />
                )}
              />
            </div>
          </div>
        </Card>
        <Card title="Other Details" className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4">
            <Controller
              name="loginAllowed"
              control={control}
              render={({ field: { value, onChange } }) => (
                <FormRadioGroup
                  label="Login Allowed?"
                  name="loginAllowed"
                  options={[
                    {
                      value: 'true',
                      label: 'Yes',
                    },
                    {
                      value: 'false',
                      label: 'No',
                    },
                  ]}
                  value={value ? 'true' : 'false'}
                  onChange={val => onChange(val === 'true')}
                  inline={true}
                />
              )}
            />
            <Controller
              name="emailNotifications"
              control={control}
              render={({ field: { value, onChange } }) => (
                <FormRadioGroup
                  label="Receive email notifications?"
                  name="emailNotifications"
                  options={[
                    {
                      value: 'true',
                      label: 'Yes',
                    },
                    {
                      value: 'false',
                      label: 'No',
                    },
                  ]}
                  value={value ? 'true' : 'false'}
                  onChange={val => onChange(val === 'true')}
                  inline={true}
                />
              )}
            />
            <Controller
              name="hourlyRate"
              control={control}
              render={({ field: { value, onChange } }) => (
                <CurrencyInput
                  label="Hourly Rate"
                  value={value}
                  onChange={onChange}
                  currency="$"
                />
              )}
            />
            <Controller
              name="slackMemberId"
              control={control}
              render={({ field }) => (
                <FormInput
                  label="Slack Member ID"
                  placeholder="Enter Slack ID"
                  {...field}
                />
              )}
            />
            <Controller
              name="skills"
              control={control}
              render={({ field: { value, onChange } }) => (
                <TagsInput
                  label="Skills"
                  tags={value || []}
                  onChange={onChange}
                  placeholder="Type and press Enter"
                />
              )}
            />
            <Controller
              name="probationEndDate"
              control={control}
              render={({ field: { value, onChange } }) => (
                <DateInput
                  label="Probation End Date"
                  value={value || undefined}
                  onChange={onChange}
                />
              )}
            />
            <Controller
              name="noticeStartDate"
              control={control}
              render={({ field: { value, onChange } }) => (
                <DateInput
                  label="Notice Period Start Date"
                  value={value || undefined}
                  onChange={onChange}
                />
              )}
            />
            <Controller
              name="noticeEndDate"
              control={control}
              render={({ field: { value, onChange } }) => (
                <DateInput
                  label="Notice Period End Date"
                  value={value || undefined}
                  onChange={onChange}
                />
              )}
            />
            <Controller
              name="employmentType"
              control={control}
              render={({ field: { onChange, value } }) => (
                <FormSelect
                  label="Employment Type"
                  options={[
                    {
                      value: 'Full-time',
                      label: 'Full-time',
                    },
                    {
                      value: 'Part-time',
                      label: 'Part-time',
                    },
                    {
                      value: 'Contract',
                      label: 'Contract',
                    },
                    {
                      value: 'Intern',
                      label: 'Intern',
                    },
                  ]}
                  value={value}
                  onChange={onChange}
                />
              )}
            />
            <Controller
              name="maritalStatus"
              control={control}
              render={({ field: { onChange, value } }) => (
                <FormSelect
                  label="Marital Status"
                  options={[
                    {
                      value: 'Single',
                      label: 'Single',
                    },
                    {
                      value: 'Married',
                      label: 'Married',
                    },
                    {
                      value: 'Divorced',
                      label: 'Divorced',
                    },
                    {
                      value: 'Widowed',
                      label: 'Widowed',
                    },
                  ]}
                  value={value}
                  onChange={onChange}
                />
              )}
            />
            <Controller
              name="businessAddress"
              control={control}
              render={({ field }) => (
                <FormInput
                  label="Business Address"
                  placeholder="e.g. Ahmedabad, India"
                  isRequired
                  error={errors.businessAddress?.message}
                  {...field}
                />
              )}
            />
          </div>
        </Card>
        <div className="flex flex-wrap gap-3 mb-6">
          <Button type="submit" variant="primary">
            Save
          </Button>
          <Button type="button" variant="secondary">
            Save & Add More
          </Button>
          <Button
            type="button"
            variant="text"
            onClick={() => navigate('/employees')}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};
export default AddEmployee;
