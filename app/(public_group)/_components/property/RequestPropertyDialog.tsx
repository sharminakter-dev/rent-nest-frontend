"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useActionState, useEffect, useState } from "react"
import { toast } from "sonner"
import { requestProperty } from "../../_actions/propertyActions"
import { RequestPropertyState } from "@/lib/types"


type RequestPropertyDialogProps = {
    propertyId: string
}

export function RequestPropertyDialog({ propertyId }: RequestPropertyDialogProps) {
    const [open, setOpen] = useState(false)

    const action = requestProperty.bind(null, propertyId)

    const [state, formAction, pending] = useActionState<RequestPropertyState, FormData>(action, null)

    useEffect(() => {
        if (!state) return

        if (state.success) {
            toast.success(state.message || "Request sent to the landlord")
            // eslint-disable-next-line react-hooks/set-state-in-effect -- closing the dialog is the intended reaction to the server action's result, not a render loop
            setOpen(false)
        } else {
            toast.error(state.message || "Something went wrong")
        }
    }, [state])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger render={<Button className="w-full" size="lg" />}>
                Request this property
            </DialogTrigger>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>Request this property</DialogTitle>
                </DialogHeader>
                <form action={formAction} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="startDate">Move-in date</Label>
                        <Input id="startDate" name="startDate" type="date" required />
                        {state?.errors?.startDate && (
                            <p className="text-xs text-destructive">{state.errors.startDate}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="durationMonths">Duration (months)</Label>
                        <Input
                            id="durationMonths"
                            name="durationMonths"
                            type="number"
                            min={1}
                            defaultValue={6}
                            required
                        />
                        {state?.errors?.durationMonths && (
                            <p className="text-xs text-destructive">{state.errors.durationMonths}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="message">Message to landlord</Label>
                        <Textarea
                            id="message"
                            name="message"
                            placeholder="Tell the landlord a bit about yourself..."
                            className="min-h-24"
                        />
                    </div>

                    <DialogFooter>
                        <Button type="submit" disabled={pending} className="w-full">
                            {pending ? "Sending..." : "Send Request"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}