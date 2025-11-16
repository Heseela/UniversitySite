import { db } from "@/db"
import { users } from "@/db/schema/auth"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import CloudinaryImage from "@/components/ui/cloudinary-image";
import UserActions from "@/components/cms/users/users-action";
import ContainerLayout from "@/components/cms/container-layout";
import AddUserBtn from "@/components/cms/users/add-user-btn";

export default async function UsersPage() {
    const foundUsers = await db.select().from(users);

    return (
        <ContainerLayout
            title="Users"
            description="Manage your CMS users here"
            actionTrigger={
                <AddUserBtn />
            }
        >
            <div className="rounded-md border overflow-hidden">
                <Table>
                    <TableHeader className="bg-border">
                        <TableRow>
                            <TableHead>S.N</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Email Verified At</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {foundUsers.map((user, index: number) => (
                            <TableRow key={user.id}>
                                <TableCell className="font-medium">{index + 1}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">

                                        {
                                            user.image && (
                                                <CloudinaryImage
                                                    src={user.image}
                                                    alt={user.name || ""}
                                                    height={40}
                                                    width={40}
                                                    crop="auto"
                                                />
                                            )
                                        }
                                        <span>{user.name || "-"}</span>
                                    </div>
                                </TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell className="capitalize">{user.role}</TableCell>
                                <TableCell>{user.emailVerified ? new Date(user.emailVerified).toLocaleString() : "-"}</TableCell>
                                <TableCell>
                                    <UserActions userId={user.id} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </ContainerLayout>
    )
}